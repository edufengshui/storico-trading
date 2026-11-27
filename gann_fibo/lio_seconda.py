# 27/11/2026 (Edu: "Si"): la SECONDA ENTRATA sul ritracciamento nei trade di Lio.
# Trade di Lio dal dump di misura_vivo (liv LI). Prima entrata 00:00 GMT, uscita 21:00. Se durante il giorno il prezzo va CONTRO Lio
# di X (frazione del campo medio giornaliero degli ultimi 20 giorni), seconda entrata al prezzo orario in cui X risulta raggiunto
# (apertura o chiusura dell'ora: niente entrata "sul livello"), uscita 21:00. Pip netti di 1,5 di spread per ogni entrata.
import json, sys, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']
D = [x for x in json.load(open('/tmp/dump.json')) if x.get('liv') == 'LI' and x.get('liDir')]
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
        days[c + G[i][0]] = (G[i][1], sum(G[j][2] for j in range(i-20, i)) / 20)
XS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.75, 1.0]
for x in D:
    k = x['cross'] + x['date']
    if k not in days: continue
    pts, atr = days[k]; P = 100 if x['cross'].endswith('JPY') else 10000; d = x['date']
    s = 1 if x['liDir'] == 'LONG' else -1; O = pts[0][1]; C = pts[-1][1]
    p1 = s * (C - O) * P - SP
    verso = 'col trend' if x['liDir'] == x['trend'] else 'contro il trend'
    add('0 prima entrata 00:00 | tutti i trade di Lio', d, p1)
    for X in XS:
        j = next((j for j, (h, p) in enumerate(pts) if j > 0 and j < len(pts) - 1 and s * (p - O) <= -X * atr), None)
        nm = 'contro Lio di %.2f del campo' % X
        if j is None:
            add('1 %s | MAI raggiunto: prima entrata' % nm, d, p1); add('8 %s | strategia: 00:00 + seconda entrata' % nm, d, p1); continue
        h, pe = pts[j]; p2 = s * (C - pe) * P - SP
        add('1 %s | raggiunto: prima entrata (00:00)' % nm, d, p1)
        add('2 %s | raggiunto: SECONDA entrata' % nm, d, p2)
        add('8 %s | strategia: 00:00 + seconda entrata' % nm, d, p1 + p2)
        add('8 %s | strategia: stop a quel punto (esco invece di rientrare)' % nm, d, s * (pe - O) * P - SP)
        if X in (0.2, 0.3, 0.5):
            add('3 %s | seconda entrata | Lio %s' % (nm, x.get('liForza')), d, p2)
            add('4 %s | seconda entrata | Lio %s' % (nm, verso), d, p2)
            fa = 'fino alle 07 GMT' if h <= 7 else '07-12 GMT' if h <= 12 else '12-16 GMT' if h <= 16 else 'dopo le 16 GMT'
            add('5 %s | seconda entrata | raggiunto %s' % (nm, fa), d, p2)
            add('6 %s | seconda entrata | %s' % (nm, x['cross']), d, p2)
    for X in XS:
        if not any(j > 0 and s * (p - O) <= -X * atr for j, (h, p) in enumerate(pts[:-1])): add('8 %s | strategia: stop a quel punto (esco invece di rientrare)' % ('contro Lio di %.2f del campo' % X), d, p1)
f = lambda g: '%5d %5.1f%% %+6.1f %+8.0f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0, g[2])
print('%-80s %s | %s' % ('', '2020-23: trade vinti pip/trade pip tot', '2024-26'))
for k in sorted(R): print('%-80s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
