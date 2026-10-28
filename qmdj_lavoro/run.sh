#!/bin/bash
# $1 = name|opt , $2 = sis
name="${1%%|*}"; opt="${1#*|}"
cd /home/claude/qm && export NODE_PATH=/home/claude/storico-trading/node_modules
out=$(SIS=$2 node -e "$opt require('/home/claude/qm/conferma_sis.js')" 2>&1 | head -1)
echo "$2|$name|$out"
