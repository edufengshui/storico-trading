# 27/11/2026 (Edu: "Voglio investigare il Fibonacci" - "Si" all'entrata sul livello durante il giorno).
# Gamba = dall'inizio del nostro trend (estremo nei 12 giorni prima del giro dell'EMA12) al massimo/minimo raggiunto fino a ieri.
# Ogni rapporto r e' provato DA SOLO: se oggi l'apertura sta dalla parte del trend rispetto al livello e il prezzo lo tocca
# (barre orarie, apertura e chiusura), si entra sul livello nel verso del trend.
# CORREZIONE: l'entrata e' al prezzo orario (apertura o chiusura dell'ora) in cui il livello risulta raggiunto, non sul livello:
# coi soli prezzi orari entrare 'sul livello' conta solo i tocchi finiti oltre e falsa il conto contro l'entrata. Stop e obiettivo
# escono anch'essi al prezzo orario.
#  uscita C: chiusura delle 21:00 GMT.   uscita A: stop a 0,15 gamba oltre il livello, obiettivo il massimo della gamba, altrimenti 21:00.
# Accanto ai rapporti di Fibonacci ci sono rapporti qualunque (0,1 0,2 0,3 ...) come confronto. Pip netti di 1,5 di spread.
import json, sys, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']
try: LIO = {x['cross'] + x['date']: x for x in json.load(open('/tmp/dump.json'))}
except Exception: LIO = {}
FIB = [0.236, 0.382, 0.5, 0.618, 0.786]; RATIOS = sorted(set(FIB + [0.1, 0.2, 0.3, 0.44, 0.56, 0.7, 0.9]))
SPREAD = 1.5; FD = [5, 8, 13, 21, 34, 55]
R = defaultdict(lambda: [[0, 0, 0.0], [0, 0, 0.0]])
def add(k, d, p):
    g = R[k][0 if d < '2024-01-01' else 1]; g[0] += 1; g[1] += p > 0; g[2] += p
for c in H:
    P = 100 if c.endswith('JPY') else 10000
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    G = []
    for d in sorted(by):
        if dt.date.fromisoformat(d).weekday() > 4: continue
        bb = sorted([b for b in by[d] if b['t'][11:13] <= '21'], key=lambda b: b['t'])
        if not bb or bb[0]['t'][11:13] != '00' or bb[-1]['t'][11:13] != '21': continue
        v = [x for b in bb for x in (b['o'], b['c'])]
        G.append(dict(d=d, o=bb[0]['o'], c=bb[-1]['c'], h=max(v), l=min(v), path=v))
    n = len(G); cl = [g['c'] for g in G]; ema = []
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + (2/13) * (x - ema[-1]))
    sl = [0] + [1 if ema[i] > ema[i-1] else -1 if ema[i] < ema[i-1] else 0 for i in range(1, n)]
    for i in range(40, n):
        g = G[i]; d = g['d']; y = i - 1; tr = sl[y]
        if not tr: continue
        s = y
        while s > 1 and sl[s-1] == tr: s -= 1
        run = y - s + 1; rng = range(max(0, s-12), s+1)
        a = min(rng, key=lambda j: G[j]['l']) if tr > 0 else max(rng, key=lambda j: G[j]['h'])
        ap = G[a]['l'] if tr > 0 else G[a]['h']
        if y - a < 2: continue
        top = max(G[j]['h'] for j in range(a, y+1)) if tr > 0 else min(G[j]['l'] for j in range(a, y+1))
        leg = abs(top - ap); atr = sum(G[j]['h'] - G[j]['l'] for j in range(y-19, y+1)) / 20
        if leg < 2 * atr: continue
        O = g['o']; path = g['path']; fine = g['c']
        seg = tr * (fine - O) * P
        t = i - a
        add('0 giornate con una gamba valida: il mercato segue il trend (00-21)', d, seg)
        add('7 giorno di Fibonacci dall\'inizio del trend (5,8,13,21,34,55) %s: segue' % ('si' if t in FD else 'no'), d, seg)
        rO = tr * (top - O) / leg
        zona = 'sopra il massimo' if rO < 0 else 'fino a 23,6' if rO < .236 else '23,6-38,2' if rO < .382 else '38,2-50' if rO < .5 else '50-61,8' if rO < .618 else '61,8-78,6' if rO < .786 else 'oltre 78,6'
        add('6 apertura gia\' ritracciata %-16s: segue (00-21)' % zona, d, seg)
        lio = LIO.get(c + d); ld = lio.get('liDir') if lio and lio.get('liv') == 'LI' else None
        trS = 'LONG' if tr > 0 else 'SHORT'
        for r in RATIOS:
            L = top - tr * r * leg
            if (O - L) * tr <= 0: continue                      # il livello non e' davanti all'apertura
            k = next((j for j, x in enumerate(path) if j > 0 and (x - L) * tr <= 0), None)
            nome = ('FIB %.3f' if r in FIB else 'qualunque %.3f') % r
            if k is None: add('1 %s | non toccato: il mercato segue (00-21)' % nome, d, seg); continue
            E0 = path[k]; pC = tr * (fine - E0) * P - SPREAD
            stop = L - tr * 0.15 * leg; pA = None
            for x in path[k+1:]:
                if (x - stop) * tr <= 0: pA = tr * (x - E0) * P - SPREAD; break
                if (x - top) * tr >= 0: pA = tr * (x - E0) * P - SPREAD; break
            if pA is None: pA = pC
            add('2 %-15s | uscita alle 21:00' % nome, d, pC)
            add('3 %-15s | stop 0,15 gamba, obiettivo il massimo' % nome, d, pA)
            if r in FIB:
                add('4 FIB %.3f | trend %s | uscita 21:00' % (r, 'giovane (fino a 9 g)' if run < 10 else 'vecchio (10+ g)'), d, pC)
                add('5 FIB %.3f | %s | uscita 21:00' % (r, 'Lio tace' if not ld else 'Lio col trend' if ld == trS else 'Lio contro il trend'), d, pC)
                add('8 tutti i livelli FIB insieme | uscita 21:00', d, pC)
            else: add('8 tutti i livelli qualunque insieme | uscita 21:00', d, pC)
f = lambda g: '%5d %5.1f%% %+6.1f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0)
print('%-74s %s | %s' % ('', '2020-23: trade vinti pip/trade', '2024-26'))
for k in sorted(R): print('%-74s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
