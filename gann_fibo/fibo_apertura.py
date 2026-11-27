# 27/11/2026 (Edu: "Si"): la SECONDA ENTRATA sul ritracciamento nei trade di Lio.
# Trade di Lio dal dump di misura_vivo (liv LI). Prima entrata 00:00 GMT, uscita 21:00. Se durante il giorno il prezzo va CONTRO Lio
# di X (frazione del campo medio giornaliero degli ultimi 20 giorni), seconda entrata al prezzo orario in cui X risulta raggiunto
# (apertura o chiusura dell'ora: niente entrata "sul livello"), uscita 21:00. Pip netti di 1,5 di spread per ogni entrata.
import json, sys, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']
D = [x for x in json.load(open('/tmp/dump.json')) if x.get('liv') == 'LI' and x.get('liDir') and x.get('liForza') != 'debole']
SP = 1.5
R = defaultdict(lambda: [[0, 0, 0.0], [0, 0, 0.0]])
def add(k, d, p):
    g = R[k][0 if d < '2024-01-01' else 1]; g[0] += 1; g[1] += p > 0; g[2] += p
days = {}
for c in H:
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    ks = [d for d in sorted(by) if dt.date.fromisoformat(d).weekday() <= 4]
    G = []
    for d in ks:
        bb = sorted([b for b in by[d] if b['t'][11:13] <= '21'], key=lambda b: b['t'])
        if not bb or bb[0]['t'][11:13] != '00' or bb[-1]['t'][11:13] != '21': continue
        pts = [(int(bb[0]['t'][11:13]), bb[0]['o'])] + [(int(b['t'][11:13]) + 1, b['c']) for b in bb]   # (ora GMT in cui il prezzo e' noto, prezzo)
        v = [p for _, p in pts]; G.append((d, pts, max(v) - min(v)))
    for i in range(20, len(G)):
        days[c + G[i][0]] = (G[i][1], sum(G[j][2] for j in range(i-20, i)) / 20, G[i-1][2])
XS = [0.1, 0.2, 0.236, 0.3, 0.382, 0.45, 0.5, 0.55, 0.618, 0.7, 0.786, 0.9, 1.0]
FIB = (0.236, 0.382, 0.5, 0.618, 0.786)
for x in D:
    k = x['cross'] + x['date']
    if k not in days: continue
    pts, atr0, ieri = days[k]; P = 100 if x['cross'].endswith('JPY') else 10000; d = x['date']
    s = 1 if x['liDir'] == 'LONG' else -1; O = pts[0][1]; C = pts[-1][1]
    p1 = s * (C - O) * P - SP
    verso = 'col trend' if x['liDir'] == x['trend'] else 'contro il trend'
    add('0 prima entrata 00:00 | tutti i trade di Lio', d, p1)
    for rif, atr in (('A campo medio 20 g', atr0), ('B campo di ieri', ieri)):
      for fin, h0, h1 in (('ore 02-07', 2, 7), ('tutto il giorno', 1, 20)):
        for X in XS:
            j = next((j for j, (h, p) in enumerate(pts) if h0 <= h <= h1 and s * (p - O) <= -X * atr), None)
            if j is None: continue
            p2 = s * (C - pts[j][1]) * P - SP
            add('%s | %s | %s %.3f' % (rif, fin, 'FIB      ' if X in FIB else 'qualunque', X), d, p2)
f = lambda g: '%5d %5.1f%% %+6.1f %+8.0f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0, g[2])
print('%-80s %s | %s' % ('', '2020-23: trade vinti pip/trade pip tot', '2024-26'))
for k in sorted(R): print('%-80s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
