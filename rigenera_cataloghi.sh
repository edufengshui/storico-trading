#!/bin/sh
# RIGENERA TUTTI I CATALOGHI PER FORMA (S58, 17/10/2026): sistema D, LY, PB e DLR per forma, nell'ordine giusto.
# Uso: sh rigenera_cataloghi.sh [DUMP] [FINO_A]   es. sh rigenera_cataloghi.sh /tmp/tresist.json 2026-09-29
#   FINO_A (facoltativo): usa solo le carte con data < FINO_A (per provare i cataloghi su giorni che non hanno visto).
# Prima: il dump TRESIST (vedi RIPARTENZA_11_10_2026_S56.md, passo 4, con SOGLIAPIP=0).
set -e
cd "$(dirname "$0")"
DUMP=${1:-/tmp/tresist.json}
if [ -n "$2" ]; then node -e "const d=require('$DUMP').filter(r=>r.date<'$2');require('fs').writeFileSync('/tmp/tresist_run.json',JSON.stringify(d));console.log('carte prima del $2:',d.length)"; DUMP=/tmp/tresist_run.json; fi
node livello_d_database.js "$DUMP" | head -2
node livello_d_costruisci.js | head -1
node livello_d_genera.js
node livello_ly_costruisci.js "$DUMP" | head -1 && node livello_ly_genera.js
node livello_pb_costruisci.js "$DUMP" | head -1 && node livello_pb_genera.js
node livello_dlr_costruisci.js "$DUMP" && node livello_dlr_genera.js
