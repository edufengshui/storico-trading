# RIPARTENZA S65 — Output del controllato, carte MDO (dalla chat S64, 29/10/2026)

Leggere prima: questo file, poi RIPARTENZA_29_10_2026_S64.md, S63, S62 (regole di lavoro, formato, motore, kit).

## ALL'INIZIO (invariato)
1. Trade della notte: git pull; unzip -o history_full_1h_f.zip history_full_1h_from20200129.json; node misura_vivo.js; git checkout del .json.
   Esiti del giorno: DUMPC=<file> node misura_vivo.js <ieri> <oggi>. Clonare con add_repo (edufengshui/storico-trading e edufengshui/trading) funziona.
2. Promemoria privacy (repo privato, app su Cloudflare Pages + Access).
3. Poi il QMDJ dalla prossima carta (sotto).

## DOTTRINA DI OGGI (letture di Edu)
- USDJPY 24/09/2026 (segue, +54, ZFTY giusto, DsHs sbagliato). Edu: "戊子 sta direttamente su Kan, opposto del trend (Kan attacca Li = ZF)";
  "辛卯 clasha se stesso fra Gen e Kun (la stella Aggressor contiene 卯), ed entrambi controllano Kan che attaccava Li". Approvata anche la
  mia lettura (辛 = stelo del giorno; 卯 in Zhen con lo ZS-Birth genera Li vuoto; 卯 clasha il mese 酉).
- OUTPUT DEL CONTROLLATO (nome di Edu): il controllato genera un palazzo timely che controlla chi lo controllava (nei 5 elementi succede
  sempre; conta solo se e' timely nel mese, 旺/相, e non vuoto). Edu: "al contrario e' il ponte" (il qi ricircola a chi controlla).
- EURJPY 29/09/2026 (segue, -51 = con il trend SHORT, DsHs e ZFTY giusti, Lio sbagliato): colpo in 丙申 (15-17 GMT, +54).
  Edu: "丙申 ci sta tutto come favorevole allo ZF: 丙 sta su Kun sopra 庚 che nasconde 申" (Kun genera Dui = ZF con ZS).

## CABLATO OGGI (repo trading, pubblicato)
- qmdj.js QMDJ_OUTPUT 'zfty' (PER_DEFAULT): ZF controlla il TY, la carta segue, ma l'Output del TY NON e' timely -> fermo.
  (Forzare "segue" quando l'Output e' timely peggiorava.) ZFTY: 2020-23 1.428 · 52,7% · +5.498 | 2024-26 1.112 · 53,3% · +6.365 | vivo 51 · 60,8% · +786.
  Opzioni: QMDJ_OUTPUT_MODO 'fermo'|'contro', QMDJ_OUTPUT_SIMM (anche TY che controlla; peggiora). Su DsHs peggiora: spenta.
- qmdj_ore.js: campi output / outputStelo / outputMotivo / outputVerso sulle ore col ramo nel palazzo dell'Output timely
  (1,20x e 1,03x contro 1,09x e 0,89x del giorno; con anche lo stelo, 2024-26: ora piu' forte 16% contro 9%).

## MISURE SENZA ESITO (non cablate)
- Porta Open (posizione, rapporti, vuoto, ore): niente; solo ZFTY con Open d'accordo +4/+1 punti.
- Palazzo opposto allo ZF: niente; ZFTY con lo ZF che lo controlla +2/+3 punti.
- Ponte timely: non spiega la tenuta del controllo (Output e ponte non sono mai timely insieme).
- Ora dello stelo del giorno; stelo e ramo dell'ora nello stesso palazzo (anche via 六仪) favorevole/che genera lo ZF; anche ristretto allo
  stelo del giorno: ampiezza normale. Forma di 丙申 da stringere ancora (Edu: il problema e' il codice largo, non la dottrina).

## KIT
Nuovi in qmdj_lavoro: open_test.js, open_ore.js, opp_test.js, opp_ore.js, output_test.js, output_ore.js, ponte_output.js, out_split.js,
ds_ore.js, stramo_ore.js, stramo2.js (le *_ore.js partono da mdo_ampiezza.js; servono dump_2020_26.json e dump_vivo.json in /home/claude/qm).

## PROSSIME CARTE (movimento che il MDO non vede)
EURJPY 15/10, GBPUSD 13/10 (lista_ferme.js), poi di nuovo cerca_muta.js. AUDUSD 10/09: 丙午 = pilastro dell'anno, da rivedere.
