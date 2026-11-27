//+------------------------------------------------------------------+
//| LioEA.mq4 — S70 (17/11/2026), segno di vita S77 (24/11/2026),   |
//| seconda entrata S79 (27/11/2026)                                 |
//| Entra alle 01:00 GMT sui segnali di Lio del giorno, esce alle    |
//| 21:00 GMT, manda i risultati al Worker. Nessuno stop.            |
//| Lotto: 0,02 sui segnali forti, 0,01 su medi e deboli.            |
//| SECONDA ENTRATA (Edu 27/11/2026): sui segnali forti e medi, se   |
//| a un'ora piena fra le 02 e le 07 GMT il prezzo e' andato contro   |
//| Lio fino al livello mandato coi segnali (0,2 del campo medio      |
//| giornaliero sotto/sopra l'apertura delle 00:00), si entra una     |
//| seconda volta a 0,01. Esce alle 21:00 come la prima.              |
//| Va messo su UN solo grafico (qualsiasi cross).                   |
//| Strumenti > Opzioni > Consiglieri esperti: permettere WebRequest |
//| per l'indirizzo del Worker.                                      |
//+------------------------------------------------------------------+
#property copyright "Edu - DLR trading"
#property version   "1.20"
#property strict

input string UrlWorker             = "https://trading-forex-seed.decumano16.workers.dev";
input string Chiave                = "";      // chiave dell'EA (EA_KEY del Worker)
input double LottoForte            = 0.02;    // lotto sui segnali forti
input double LottoAltri            = 0.01;    // lotto su medi e deboli
input int    OraEntrataGMT         = 1;       // ora di entrata (GMT)
input int    MinutiFinestraEntrata = 45;      // per quanti minuti si riprova a entrare
input int    OraUscitaGMT          = 21;      // ora di uscita (GMT)
input int    Magic                 = 70117;   // numero che marca gli ordini di Lio
input int    Slippage              = 30;      // scarto massimo (punti)
input string Suffisso              = "";      // suffisso dei simboli del broker (vuoto su ThinkMarkets)
input int    MinutiSegnoDiVita     = 30;      // ogni quanti minuti l'EA dice al Worker che e' vivo (0 = mai)
input bool   SecondaEntrata        = true;    // seconda entrata sul ritracciamento (forti e medi)
input double LottoSeconda          = 0.01;    // lotto della seconda entrata
input int    OraFineSecondaGMT     = 7;       // ultima ora (GMT) in cui si controlla la seconda entrata
input int    MinutiControlloSeconda = 3;      // si controlla nei primi minuti di ogni ora piena

string GV_E, GV_R, GV_P;
string statoEntrata = "in attesa";
string statoUscita  = "in attesa";
string statoSeconda = "nessuna";
datetime ultimoSegnali = 0, ultimoEsiti = 0, ultimoVivo = 0;

int OnInit()
  {
   string p = "LioEA_" + IntegerToString(AccountNumber()) + "_";
   GV_E = p + "entrata";
   GV_R = p + "risultati";
   GV_P = p;
   EventSetTimer(20);
   Print("LioEA avviato. Entrata ", OraEntrataGMT, ":00 GMT, uscita ", OraUscitaGMT, ":00 GMT.");
   Mostra();
   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   EventKillTimer();
   Comment("");
  }

void OnTick() { }

int GiornoNum(datetime t) { return(TimeYear(t) * 10000 + TimeMonth(t) * 100 + TimeDay(t)); }
string GiornoTxt(datetime t) { return(StringFormat("%04d-%02d-%02d", TimeYear(t), TimeMonth(t), TimeDay(t))); }
string OraTxt(datetime t) { return(StringFormat("%02d:%02d", TimeHour(t), TimeMinute(t))); }

// scarto fra l'ora del server e il GMT, in secondi (arrotondato all'ora)
int ScartoServer()
  {
   double ore = MathRound((double)(TimeCurrent() - TimeGMT()) / 3600.0);
   return((int)ore * 3600);
  }

bool E_Nostro() { return(OrderMagicNumber() == Magic && (OrderType() == OP_BUY || OrderType() == OP_SELL)); }

int ContaAperti()
  {
   int n = 0;
   for(int i = OrdersTotal() - 1; i >= 0; i--)
      if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES) && E_Nostro()) n++;
   return(n);
  }

void Mostra()
  {
   datetime g = TimeGMT();
   Comment("LioEA  |  GMT " + GiornoTxt(g) + " " + OraTxt(g) +
           "\nEntrata " + IntegerToString(OraEntrataGMT) + ":00 GMT: " + statoEntrata +
           "\nUscita " + IntegerToString(OraUscitaGMT) + ":00 GMT: " + statoUscita +
           (SecondaEntrata ? "\nSeconda entrata (02-" + IntegerToString(OraFineSecondaGMT) + " GMT): " + statoSeconda : "") +
           "\nTrade di Lio aperti: " + IntegerToString(ContaAperti()) +
           (IsTradeAllowed() ? "" : "\nATTENZIONE: AutoTrading spento"));
  }

bool Http(string metodo, string url, string corpo, string &risposta)
  {
   char dati[], ris[];
   string intest = "";
   if(StringLen(corpo) > 0)
     {
      int n = StringToCharArray(corpo, dati, 0, WHOLE_ARRAY, CP_UTF8);
      if(n > 0) ArrayResize(dati, n - 1);   // via lo zero finale
     }
   ResetLastError();
   int codice = WebRequest(metodo, url, "Content-Type: text/plain\r\n", 15000, dati, ris, intest);
   if(codice == -1)
     {
      int err = GetLastError();
      risposta = "errore " + IntegerToString(err) + (err == 4060 ? " (indirizzo non permesso: Strumenti > Opzioni > Consiglieri esperti)" : "");
      return(false);
     }
   risposta = CharArrayToString(ris, 0, WHOLE_ARRAY, CP_UTF8);
   if(codice != 200) { risposta = "risposta " + IntegerToString(codice) + " " + risposta; return(false); }
   return(true);
  }

// il trade di oggi su questo simbolo c'e' gia' (aperto o gia' chiuso)?
bool GiaFatto(string sym, int oggi)
  {
   int i;
   for(i = OrdersTotal() - 1; i >= 0; i--)
      if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES) && E_Nostro() && OrderSymbol() == sym) return(true);
   int sc = ScartoServer();
   for(i = OrdersHistoryTotal() - 1; i >= 0; i--)
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY) && E_Nostro() && OrderSymbol() == sym &&
         GiornoNum(OrderOpenTime() - sc) == oggi) return(true);
   return(false);
  }

bool Apri(string sym, string verso, double lotti, string etichetta)
  {
   if(!SymbolSelect(sym, true)) { Print("LioEA: simbolo sconosciuto ", sym); return(false); }
   int tipo = (verso == "LONG") ? OP_BUY : OP_SELL;
   double passo = MarketInfo(sym, MODE_LOTSTEP), minimo = MarketInfo(sym, MODE_MINLOT);
   if(passo > 0) lotti = MathRound(lotti / passo) * passo;
   if(lotti < minimo) lotti = minimo;
   lotti = NormalizeDouble(lotti, 2);
   int cifre = (int)MarketInfo(sym, MODE_DIGITS);
   for(int k = 0; k < 5; k++)
     {
      RefreshRates();
      double prezzo = (tipo == OP_BUY) ? MarketInfo(sym, MODE_ASK) : MarketInfo(sym, MODE_BID);
      if(prezzo <= 0) { Sleep(2000); continue; }
      if(AccountFreeMarginCheck(sym, tipo, lotti) <= 0)
        { Print("LioEA: margine insufficiente per ", sym, " ", DoubleToString(lotti, 2)); return(false); }
      ResetLastError();
      int tk = OrderSend(sym, tipo, lotti, NormalizeDouble(prezzo, cifre), Slippage, 0, 0, etichetta + " " + verso, Magic, 0, clrNONE);
      if(tk > 0) { Print("LioEA: aperto (", etichetta, ") ", sym, " ", verso, " ", DoubleToString(lotti, 2), " a ", DoubleToString(prezzo, cifre)); return(true); }
      Print("LioEA: ordine ", sym, " non passato, errore ", GetLastError(), " (tentativo ", k + 1, ")");
      Sleep(3000);
     }
   return(false);
  }

void Entra(datetime g)
  {
   if(TimeLocal() - ultimoSegnali < 60) return;      // una richiesta al minuto
   ultimoSegnali = TimeLocal();
   if(!IsTradeAllowed()) { statoEntrata = "AutoTrading spento"; return; }
   string testo;
   if(!Http("GET", UrlWorker + "/segnali?k=" + Chiave, "", testo))
     { statoEntrata = "segnali non letti: " + testo; Print("LioEA: ", statoEntrata); return; }
   StringReplace(testo, "\r", "");
   string righe[];
   int n = StringSplit(testo, '\n', righe);
   string data = "";
   bool fine = false;
   int i;
   for(i = 0; i < n; i++)
     {
      if(StringFind(righe[i], "DATA=") == 0) data = StringSubstr(righe[i], 5);
      if(righe[i] == "FINE") fine = true;
     }
   if(!fine || data != GiornoTxt(g))
     { statoEntrata = "segnali non ancora di oggi (" + data + ")"; Print("LioEA: ", statoEntrata); return; }
   int oggi = GiornoNum(g), aperti = 0, previsti = 0;
   bool tuttiOk = true;
   for(i = 0; i < n; i++)
     {
      string c[];
      if(StringSplit(righe[i], ';', c) < 3) continue;
      if(c[1] != "LONG" && c[1] != "SHORT") continue;
      previsti++;
      string sym = c[0] + Suffisso;
      bool fatto = GiaFatto(sym, oggi);
      if(!fatto)
        {
         double lotti = (c[2] == "forte") ? LottoForte : LottoAltri;
         fatto = Apri(sym, c[1], lotti, "Lio");
        }
      if(!fatto) { tuttiOk = false; continue; }
      aperti++;
      // S79: il livello della seconda entrata (quarto campo della riga), solo forti e medi
      if(ArraySize(c) >= 4 && c[2] != "debole" && (int)GlobalVariableGet(GV2(sym, "g2")) != oggi)
        {
         double liv = StringToDouble(c[3]);
         if(liv > 0)
           {
            GlobalVariableSet(GV2(sym, "l2"), liv);
            GlobalVariableSet(GV2(sym, "v2"), (c[1] == "LONG") ? 1 : -1);
            GlobalVariableSet(GV2(sym, "g2"), oggi);
           }
        }
     }
   statoEntrata = IntegerToString(aperti) + " trade su " + IntegerToString(previsti) + (tuttiOk ? " (fatto)" : " (riprovo)");
   if(tuttiOk) GlobalVariableSet(GV_E, oggi);
  }

// S79 (27/11/2026, Edu: "Procedi"): SECONDA ENTRATA. Misura sullo storico (forti e medi, controllo a ogni ora piena dalle 02 alle
// 07 GMT, livello = apertura delle 00:00 meno/piu' 0,2 del campo medio giornaliero): 73,1% (572 trade) e 63,8% (538), circa 28 e
// 20 pip a trade; dal vivo 23/10-26/11: 14 trade, 13 vinti. Il livello lo calcola la raccolta notturna e arriva coi segnali.
string GV2(string sym, string cosa) { return(GV_P + cosa + "_" + sym); }

// quanti trade di Lio ha oggi questo simbolo (aperti o gia' chiusi)
int ContaOggi(string sym, int oggi)
  {
   int n = 0, i, sc = ScartoServer();
   for(i = OrdersTotal() - 1; i >= 0; i--)
      if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES) && E_Nostro() && OrderSymbol() == sym &&
         GiornoNum(OrderOpenTime() - sc) == oggi) n++;
   for(i = OrdersHistoryTotal() - 1; i >= 0; i--)
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY) && E_Nostro() && OrderSymbol() == sym &&
         GiornoNum(OrderOpenTime() - sc) == oggi) n++;
   return(n);
  }

void Seconda(datetime g, int oggi)
  {
   if(!SecondaEntrata) return;
   int h = TimeHour(g);
   if(h < OraEntrataGMT + 1 || h > OraFineSecondaGMT || TimeMinute(g) >= MinutiControlloSeconda) return;
   if(!IsTradeAllowed()) return;
   string sim[];
   int n = 0, i, k, sc = ScartoServer();
   for(i = OrdersTotal() - 1; i >= 0; i--)
     {
      if(!OrderSelect(i, SELECT_BY_POS, MODE_TRADES) || !E_Nostro()) continue;
      if(GiornoNum(OrderOpenTime() - sc) != oggi) continue;
      string s0 = OrderSymbol();
      bool gia = false;
      for(k = 0; k < n; k++) if(sim[k] == s0) gia = true;
      if(gia) continue;
      ArrayResize(sim, n + 1);
      sim[n] = s0;
      n++;
     }
   for(k = 0; k < n; k++)
     {
      string sym = sim[k];
      if((int)GlobalVariableGet(GV2(sym, "g2")) != oggi) continue;      // nessun livello per oggi
      if((int)GlobalVariableGet(GV2(sym, "f2")) == oggi) continue;      // seconda entrata gia' fatta
      if(ContaOggi(sym, oggi) >= 2) { GlobalVariableSet(GV2(sym, "f2"), oggi); continue; }
      double liv = GlobalVariableGet(GV2(sym, "l2"));
      double v = GlobalVariableGet(GV2(sym, "v2"));
      RefreshRates();
      double bid = MarketInfo(sym, MODE_BID);
      if(bid <= 0 || liv <= 0) continue;
      bool arrivato = (v > 0) ? (bid <= liv) : (bid >= liv);
      if(!arrivato) continue;
      string verso = (v > 0) ? "LONG" : "SHORT";
      if(Apri(sym, verso, LottoSeconda, "Lio2"))
        {
         GlobalVariableSet(GV2(sym, "f2"), oggi);
         statoSeconda = "ultima " + sym + " " + verso + " alle " + OraTxt(g) + " GMT";
         Print("LioEA: seconda entrata ", sym, " ", verso, " (livello ", DoubleToString(liv, (int)MarketInfo(sym, MODE_DIGITS)), ")");
        }
     }
  }

// chiude i trade di Lio; se soloVecchi, soltanto quelli aperti in un giorno GMT precedente
void Chiudi(bool soloVecchi, int oggi)
  {
   int sc = ScartoServer();
   for(int i = OrdersTotal() - 1; i >= 0; i--)
     {
      if(!OrderSelect(i, SELECT_BY_POS, MODE_TRADES) || !E_Nostro()) continue;
      if(soloVecchi && GiornoNum(OrderOpenTime() - sc) >= oggi) continue;
      string sym = OrderSymbol();
      RefreshRates();
      double prezzo = (OrderType() == OP_BUY) ? MarketInfo(sym, MODE_BID) : MarketInfo(sym, MODE_ASK);
      ResetLastError();
      if(!OrderClose(OrderTicket(), OrderLots(), NormalizeDouble(prezzo, (int)MarketInfo(sym, MODE_DIGITS)), Slippage, clrNONE))
         Print("LioEA: chiusura ", sym, " non passata, errore ", GetLastError());
      else
         Print("LioEA: chiuso ", sym);
     }
  }

bool MandaRisultati(datetime g)
  {
   int oggi = GiornoNum(g), sc = ScartoServer(), righe = 0;
   string corpo = "";
   for(int i = OrdersHistoryTotal() - 1; i >= 0; i--)
     {
      if(!OrderSelect(i, SELECT_BY_POS, MODE_HISTORY) || !E_Nostro()) continue;
      if(GiornoNum(OrderOpenTime() - sc) != oggi) continue;
      string sym = OrderSymbol();
      int cifre = (int)MarketInfo(sym, MODE_DIGITS);
      double punto = MarketInfo(sym, MODE_POINT);
      double pip = (cifre == 3 || cifre == 5) ? punto * 10 : punto;
      double verso = (OrderType() == OP_BUY) ? 1.0 : -1.0;
      double pips = (pip > 0) ? verso * (OrderClosePrice() - OrderOpenPrice()) / pip : 0;
      string cross = sym;
      if(StringLen(Suffisso) > 0) StringReplace(cross, Suffisso, "");
      corpo += cross + ";" + (OrderType() == OP_BUY ? "LONG" : "SHORT") + ";" + DoubleToString(OrderLots(), 2) + ";" +
               OraTxt(OrderOpenTime() - sc) + ";" + DoubleToString(OrderOpenPrice(), cifre) + ";" +
               OraTxt(OrderCloseTime() - sc) + ";" + DoubleToString(OrderClosePrice(), cifre) + ";" +
               DoubleToString(pips, 1) + ";" + DoubleToString(OrderProfit(), 2) + ";" + DoubleToString(OrderSwap(), 2) + ";" +
               DoubleToString(OrderCommission(), 2) + ";" + AccountCurrency() + "\n";
      righe++;
     }
   if(righe == 0) { statoUscita = "nessun trade oggi"; return(true); }
   if(TimeLocal() - ultimoEsiti < 60) return(false);
   ultimoEsiti = TimeLocal();
   string risposta;
   if(!Http("POST", UrlWorker + "/esiti?k=" + Chiave + "&date=" + GiornoTxt(g), corpo, risposta))
     { statoUscita = "risultati non mandati: " + risposta; Print("LioEA: ", statoUscita); return(false); }
   statoUscita = IntegerToString(righe) + " trade chiusi, risultati mandati";
   Print("LioEA: ", statoUscita);
   return(true);
  }

// S77 (24/11/2026): il 23/11 il VPS si e' riavviato da solo e l'EA e' rimasto fermo senza che nessuno
// lo sapesse. Ogni MinutiSegnoDiVita minuti l'EA chiama il Worker; se il Worker non lo sente, avvisa Edu.
void SegnoDiVita(datetime g)
  {
   if(MinutiSegnoDiVita <= 0 || g - ultimoVivo < MinutiSegnoDiVita * 60) return;
   ultimoVivo = g;
   string risposta = "";
   if(!Http("GET", UrlWorker + "/vivo?k=" + Chiave + "&aperti=" + IntegerToString(ContaAperti()), "", risposta))
      Print("LioEA: segno di vita non mandato: ", risposta);
  }

void OnTimer()
  {
   datetime g = TimeGMT();
   int gs = TimeDayOfWeek(g), oggi = GiornoNum(g), minuti = TimeHour(g) * 60 + TimeMinute(g);
   SegnoDiVita(g);                                       // S77: anche il sabato e la domenica
   if(gs == 0 || gs == 6) { statoEntrata = "fine settimana"; statoUscita = "fine settimana"; Mostra(); return; }
   if((int)GlobalVariableGet(GV_E) != oggi && minuti < OraEntrataGMT * 60) statoEntrata = "in attesa";
   if((int)GlobalVariableGet(GV_R) != oggi && minuti < OraUscitaGMT * 60) statoUscita = "in attesa";
   if((int)GlobalVariableGet(GV_E) == oggi && statoEntrata == "in attesa") statoEntrata = "fatto";

   Chiudi(true, oggi);                                   // sicurezza: trade rimasti aperti da un giorno prima

   if(minuti >= OraUscitaGMT * 60)
     {
      if(ContaAperti() > 0) Chiudi(false, oggi);
      if(ContaAperti() == 0 && (int)GlobalVariableGet(GV_R) != oggi)
         if(MandaRisultati(g)) GlobalVariableSet(GV_R, oggi);
     }
   else if(minuti >= OraEntrataGMT * 60 && minuti < OraEntrataGMT * 60 + MinutiFinestraEntrata &&
           (int)GlobalVariableGet(GV_E) != oggi)
      Entra(g);
   else if(minuti >= OraEntrataGMT * 60 + MinutiFinestraEntrata && (int)GlobalVariableGet(GV_E) != oggi &&
           StringFind(statoEntrata, "finestra chiusa") < 0)
      statoEntrata = "finestra chiusa: oggi non si entra (" + statoEntrata + ")";
   if(minuti < OraEntrataGMT * 60) statoSeconda = "nessuna";
   if(minuti < OraUscitaGMT * 60) Seconda(g, oggi);      // S79: seconda entrata sul ritracciamento
   Mostra();
  }
//+------------------------------------------------------------------+
