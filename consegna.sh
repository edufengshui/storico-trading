#!/bin/bash
# ============================================================================
# consegna.sh — allineamento a inizio sessione, consegna in tre blocchi a fine.
#
#   BLOCCO 1 — SOFTWARE   -> repo  trading           (da pushare)
#   BLOCCO 2 — ARCHIVIO   -> repo  storico-trading   (da pushare)
#   BLOCCO 3 — RIPARTENZA -> solo per la chat successiva, MAI nei repo
#
# USO
#   bash consegna.sh --init     A INIZIO SESSIONE. Scarica i due repo con le
#                               date reali dei commit, mette nella cartella di
#                               lavoro la copia PIU' RECENTE di ogni file e
#                               fotografa lo stato di partenza.
#   bash consegna.sh --check    verifica in corso d'opera, nessuno zip
#   bash consegna.sh            crea i tre zip
#
# REGOLE
#  - Finisce nei blocchi SOLO cio' che e' cambiato rispetto alla fotografia.
#  - Un file presente in tutti e due i repo, se modificato, va in ENTRAMBI i
#    blocchi: e' cosi' che le due copie restano allineate.
#  - La RIPARTENZA non entra mai nei blocchi 1 e 2 (controllo bloccante).
# ============================================================================

set -u
WORKDIR="${WORKDIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
OUTDIR="${OUTDIR:-/mnt/user-data/outputs}"
TMP="${TMP:-/tmp/consegna_repos}"
SNAP="${SNAP:-/tmp/consegna_snapshot.txt}"
MODE="${1:-deliver}"

REPO_SW="https://github.com/edufengshui/trading.git"
REPO_AR="https://github.com/edufengshui/storico-trading.git"

# BLOCCO 1: il software vivo del sito
FILES_SW="liuyao.js app.js index.html plumblossom.js sw.js motore_dlr.js"
# BLOCCO 2: motore di ricerca, script ausiliari, registri
FILES_AR="pb_stress.js liuyao.js motore_dlr.js REGISTRO_DLR_31_08_2026.md carta_check.js carte_lette.json parita_check2.js parita_tre.js motore_principi.js \
daliuren.js jieqi-gmt.js solar-time.js trend.js nayin_map.json consegna.sh \
CANDIDATI_OSSERVAZIONE.md REGISTRO_CORREZIONI_13_08_2026.md \
REGISTRO_LIUYAO_11_08_2026_v2.md RIFERIMENTO_SOFTWARE_LY.md SISTEMA_CATENE_v3.md"
TUTTI=$(echo "$FILES_SW $FILES_AR" | tr ' ' '\n' | sed '/^$/d' | sort -u)

R=$'\e[31m'; G=$'\e[32m'; Y=$'\e[33m'; B=$'\e[1m'; O=$'\e[0m'
sha(){ [ -f "$1" ] && sha256sum "$1" | cut -c1-10 || echo "----------"; }
work(){ local f="$WORKDIR/$1"; [ -f "$f" ] && echo "$f" || echo ""; }
repo(){ local f="$TMP/$1/$2"; [ -f "$f" ] && echo "$f" || echo ""; }   # solo la RADICE = copia viva
data(){ # $1=repo  $2=file -> data ultimo commit, vuoto se assente
  [ -f "$TMP/$1/$2" ] || { echo ""; return; }
  (cd "$TMP/$1" && git log -1 --format=%cd --date=format:'%d/%m %H:%M' -- "$2" 2>/dev/null)
}
epoc(){ [ -f "$TMP/$1/$2" ] || { echo 0; return; }; (cd "$TMP/$1" && git log -1 --format=%ct -- "$2" 2>/dev/null || echo 0); }

scarica(){
  rm -rf "$TMP"; mkdir -p "$TMP"
  git clone -q --filter=blob:none "$REPO_SW" "$TMP/trading"         2>/dev/null || { echo "${R}ERRORE: repo trading non raggiungibile${O}"; exit 1; }
  git clone -q --filter=blob:none "$REPO_AR" "$TMP/storico-trading" 2>/dev/null || { echo "${R}ERRORE: repo storico-trading non raggiungibile${O}"; exit 1; }
}

# ---------------------------------------------------------------- INIT ------
if [ "$MODE" = "--init" ]; then
  echo; echo "${B}=== INIZIO SESSIONE — allineamento delle copie ===${O}"
  echo "Cartella di lavoro: $WORKDIR"; echo
  scarica
  printf "  %-33s %-14s %-14s %s\n" "FILE" "trading" "storico" "esito"
  : > "$SNAP"; AGG=0; CONF=0; MANCA=0
  for f in $TUTTI; do
    r1=$(repo trading "$f"); r2=$(repo storico-trading "$f")
    d1=$(data trading "$f"); d2=$(data storico-trading "$f")
    e1=$(epoc trading "$f"); e2=$(epoc storico-trading "$f")
    h1=$(sha "$r1"); h2=$(sha "$r2")
    [ -z "$r1" ] && [ -z "$r2" ] && { printf "  %-33s %-14s %-14s %b\n" "$f" "-" "-" "${Y}in nessun repo${O}"; continue; }
    if [ "$e1" -ge "$e2" ]; then best="$r1"; bh="$h1"; bn="trading"; else best="$r2"; bh="$h2"; bn="storico"; fi
    w=$(work "$f"); hw=$(sha "$w")
    if [ -z "$w" ]; then
      cp "$best" "$WORKDIR/$f"; hw="$bh"; esito="${G}preso da $bn${O}"; MANCA=$((MANCA+1))
    elif [ "$hw" = "$bh" ]; then
      esito="${G}gia' la piu' recente ($bn)${O}"
    elif [ "$hw" = "$h1" ] || [ "$hw" = "$h2" ]; then
      cp "$best" "$WORKDIR/$f"; hw="$bh"; esito="${Y}era la copia vecchia → aggiornata da $bn${O}"; AGG=$((AGG+1))
    else
      esito="${R}in lavoro una versione diversa da entrambi i repo — NON toccata${O}"; CONF=$((CONF+1))
    fi
    echo "$f $hw" >> "$SNAP"
    printf "  %-33s %-14s %-14s %b\n" "$f" "${d1:--}" "${d2:--}" "$esito"
  done
  echo
  echo "${B}Copie doppie dentro i repo (sottocartelle — vecchie consegne):${O}"
  DOP=0
  for f in $TUTTI; do for rp in trading storico-trading; do
    for s in $(find "$TMP/$rp" -mindepth 2 -name "$f" -not -path "*/.git/*" 2>/dev/null); do
      echo "  ${Y}$rp/${s#$TMP/$rp/}${O}"; DOP=$((DOP+1)); done
  done; done
  [ "$DOP" = "0" ] && echo "  ${G}nessuna${O}"
  echo
  echo "Fotografia salvata. Aggiornati: $AGG · presi dai repo: $MANCA · da decidere: $CONF · copie doppie: $DOP"
  [ "$CONF" -gt 0 ] && echo "${R}Attenzione: $CONF file in lavoro non corrispondono a nessuna copia dei repo.${O}"
  exit 0
fi

# ------------------------------------------------------- CHECK / DELIVER ----
[ -f "$SNAP" ] || { echo "${R}Manca la fotografia di inizio sessione: esegui prima  bash consegna.sh --init${O}"; exit 1; }
echo; echo "${B}=== CONSEGNA — verifica contro i due repository ===${O}"; echo
scarica

B1=""; B2=""; N1=""; N2=""; ERR=0; NMOD=0
printf "  %-33s %-12s %-12s %s\n" "FILE" "in lavoro" "nei repo" "destinazione"
for f in $TUTTI; do
  w=$(work "$f"); [ -z "$w" ] && continue
  hw=$(sha "$w")
  h0=$(grep -m1 "^$f " "$SNAP" | awk '{print $2}'); [ -z "$h0" ] && h0="assente"
  [ "$hw" = "$h0" ] && continue                      # non toccato → non si consegna
  NMOD=$((NMOD+1)); dest=""
  echo " $FILES_SW " | grep -q " $f " && { B1="$B1 $w"; N1="$N1 $f"; dest="BLOCCO 1"; }
  echo " $FILES_AR " | grep -q " $f " && { B2="$B2 $w"; N2="$N2 $f"; dest="${dest:+$dest + }BLOCCO 2"; }
  if [ -z "$dest" ]; then echo "  ${R}$f — modificato ma non assegnato a nessun blocco${O}"; ERR=$((ERR+1)); continue; fi
  printf "  %-33s %-12s %-12s %b\n" "$f" "$hw" "$h0" "${B}$dest${O}"
done
[ "$NMOD" = "0" ] && echo "  (nessun file modificato in questa sessione)"
echo

RIP=$(ls -t "$WORKDIR"/RIPARTENZA_*.md 2>/dev/null | head -1)
if [ -n "$RIP" ]; then echo "BLOCCO 3 — ripartenza: $(basename "$RIP")"
else echo "${Y}BLOCCO 3 — nessuna RIPARTENZA_*.md nella cartella: va scritta prima di consegnare${O}"; fi
echo

for x in $B1 $B2; do case "$(basename "$x")" in
  RIPARTENZA_*) echo "${R}BLOCCO ERRATO: la ripartenza non puo' stare nei blocchi 1 o 2${O}"; ERR=$((ERR+1));;
esac; done

echo "${B}RIEPILOGO${O}"
echo "  BLOCCO 1 — software (trading):    ${N1:- nessuna modifica, nessuno zip}"
echo "  BLOCCO 2 — archivio (storico):    ${N2:- nessuna modifica, nessuno zip}"
echo "  BLOCCO 3 — ripartenza:            $( [ -n "$RIP" ] && basename "$RIP" || echo MANCANTE )"
echo
[ "$ERR" -gt 0 ] && { echo "${R}$ERR errore/i: nessuno zip creato.${O}"; exit 1; }
[ "$MODE" = "--check" ] && { echo "Solo verifica: nessuno zip creato."; exit 0; }

mkdir -p "$OUTDIR"; D=$(date +%d_%m_%Y)
S=/tmp/consegna_stage; rm -rf "$S"; mkdir -p "$S/b1" "$S/b2" "$S/b3"
if [ -n "$B1" ]; then for x in $B1; do cp "$x" "$S/b1/"; done; rm -f "$S/b1/RIPARTENZA_"*.md
  (cd "$S/b1" && zip -qr "$OUTDIR/BLOCCO1_SOFTWARE_$D.zip" .); echo "${G}creato${O} BLOCCO1_SOFTWARE_$D.zip   → repo trading   ($(ls "$S/b1"|wc -l) file)"; fi
if [ -n "$B2" ]; then for x in $B2; do cp "$x" "$S/b2/"; done; rm -f "$S/b2/RIPARTENZA_"*.md
  (cd "$S/b2" && zip -qr "$OUTDIR/BLOCCO2_ARCHIVIO_$D.zip" .); echo "${G}creato${O} BLOCCO2_ARCHIVIO_$D.zip   → repo storico   ($(ls "$S/b2"|wc -l) file)"; fi
if [ -n "$RIP" ]; then cp "$RIP" "$S/b3/"
  (cd "$S/b3" && zip -qr "$OUTDIR/BLOCCO3_RIPARTENZA_$D.zip" .); echo "${G}creato${O} BLOCCO3_RIPARTENZA_$D.zip → solo chat      (1 file)"; fi
echo; echo "Zip in: $OUTDIR"
