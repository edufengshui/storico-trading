# 27/11/2026 (Edu: "Se lo agganciano ai JieQi?"). Fibonacci agganciato ai JieQi (istanti in GMT da lunar-javascript, Pechino - 8h).
# Ancora = prezzo orario al momento del JieQi (primo prezzo dopo l'istante). Due serie: tutti i 24 termini; solo i 12 Jie (inizio mese).
#  T1 gamba dal JieQi: A = prezzo del JieQi, B = prezzo piu' lontano da A raggiunto fino a ieri (gamba >= 1 campo medio). Oggi, se
#     il prezzo orario ritraccia fino a un livello (davanti all'apertura), entrata nel verso della gamba, uscita 21:00.
#  T2 livelli dal prezzo del JieQi misurati col campo del termine precedente: A +- r x campo. Quando oggi il prezzo orario attraversa
#     un livello: prosegue fino alle 21:00 nel verso dell'attraversamento?
#  T3 giorno del JieQi e giorno dopo: il mercato segue il trend EMA? Lio vince?
#  T4 giorni di Fibonacci (5, 8, 13, 21 giorni di mercato) dal Jie: segue il trend?
# Accanto ai rapporti di Fibonacci, rapporti qualunque. Pip netti di 1,5. Periodi 2020-23 | 2024-26.
import json, sys, datetime as dt, bisect
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']; JQ = json.load(open('/tmp/gann/jieqi.json'))
try: LIO = {x['cross'] + x['date']: x for x in json.load(open('/tmp/dump.json'))}
except Exception: LIO = {}
FIB = [0.236, 0.382, 0.5, 0.618, 0.786]; QUA = [0.3, 0.44, 0.56, 0.7, 0.9]
FIB2 = FIB + [1.0, 1.272, 1.618]; QUA2 = QUA + [1.15, 1.45]; SP = 1.5
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
        pts = [(0, bb[0]['o'])] + [(int(b['t'][11:13]) + 1, b['c']) for b in bb]; v = [p for _, p in pts]
        G.append((d, pts, max(v) - min(v), bb[-1]['c']))
    cl = [g[3] for g in G]; ema = []
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + (2/13) * (x - ema[-1]))
    sl = [0] + [1 if ema[i] > ema[i-1] else -1 if ema[i] < ema[i-1] else 0 for i in range(1, len(G))]
    # tempo di ogni punto, per trovare il prezzo del JieQi
    TT = []; TP = []; TD = []
    for i, g in enumerate(G):
        for h, p in g[1]: TT.append('%s %02d:00:00' % (g[0], h)); TP.append(p); TD.append(i)
    for serie, anc in (('24 termini', JQ), ('12 Jie', [j for j in JQ if j['jie']])):
        idx = [bisect.bisect_left(TT, j['t']) for j in anc]
        idx = [k for k in idx if 0 < k < len(TT)]
        for n, a in enumerate(idx):
            fine = idx[n + 1] if n + 1 < len(idx) else len(TT)
            A = TP[a]; ga = TD[a]
            Rprev = (max(TP[idx[n-1]:a]) - min(TP[idx[n-1]:a])) if n > 0 and a > idx[n-1] else None
            gfine = TD[fine - 1]
            for i in range(max(ga + 1, 21), gfine + 1):
                d, pts, _, C = G[i]; O = pts[0][1]; atr = sum(G[j][2] for j in range(i-20, i)) / 20
                # prezzi dal JieQi fino a ieri
                k0 = a; k1 = bisect.bisect_left(TT, d + ' 00:00:00')
                if k1 <= k0: continue
                seg = TP[k0:k1]
                B = max(seg, key=lambda x: abs(x - A)); leg = abs(B - A)
                if leg >= atr:
                    dr = 1 if B > A else -1
                    for r in FIB + QUA:
                        L = B - dr * r * leg
                        if (O - L) * dr <= 0: continue
                        j = next((j for j, (h, p) in enumerate(pts) if j > 0 and j < len(pts) - 1 and (p - L) * dr <= 0), None)
                        if j is None: continue
                        pp = dr * (C - pts[j][1]) * P - SP
                        add('T1 %s | gamba dal JieQi | %s' % (serie, 'FIB tutti' if r in FIB else 'qualunque tutti'), d, pp)
                        add('T1 %s | gamba dal JieQi | %s %.3f' % (serie, 'FIB' if r in FIB else 'qualunque', r), d, pp)
                        x = LIO.get(c + d); ld = x.get('liDir') if x and x.get('liv') == 'LI' else None
                        if r in FIB and ld: add('T1 %s | gamba dal JieQi | FIB tutti | Lio %s' % (serie, 'nello stesso verso' if ld == ('LONG' if dr > 0 else 'SHORT') else 'nel verso opposto'), d, pp)
                if Rprev and Rprev > 0:
                    for r in FIB2 + QUA2:
                        for sg in (1, -1):
                            L = A + sg * r * Rprev
                            side = 1 if O > L else -1
                            j = next((j for j, (h, p) in enumerate(pts) if j > 0 and j < len(pts) - 1 and (p - L) * side < 0), None)
                            if j is None: continue
                            cr = -side
                            pp = cr * (C - pts[j][1]) * P
                            via = 'allontanandosi dal prezzo del JieQi' if cr == sg else 'tornando verso il prezzo del JieQi'
                            add('T2 %s | livello attraversato %s | %s: prosegue' % (serie, via, 'FIB' if r in FIB2 else 'qualunque'), d, pp)
            # T3 / T4
        if serie == '12 Jie':
            giorniJie = sorted(set(TD[k] for k in idx))
    giorniTutti = {}
    for j in JQ:
        k = bisect.bisect_left(TT, j['t'])
        if 0 < k < len(TT): giorniTutti[TD[k]] = 'Jie' if j['jie'] else 'Qi'
    for i in range(21, len(G)):
        tr = sl[i-1]
        if not tr: continue
        d, pts, _, C = G[i]; p = tr * (C - pts[0][1]) * P
        cosa = ('giorno del ' + giorniTutti[i]) if i in giorniTutti else ('giorno dopo il ' + giorniTutti[i-1]) if (i-1) in giorniTutti else 'altri giorni'
        add('T3 %-22s | il mercato segue il trend EMA' % cosa, d, p)
        x = LIO.get(c + d)
        if x and x.get('liv') == 'LI' and x.get('liDir'):
            s = 1 if x['liDir'] == 'LONG' else -1; add('T3 %-22s | Lio vince' % cosa, d, s * (C - pts[0][1]) * P)
        k = bisect.bisect_right(giorniJie, i) - 1
        if k >= 0:
            n = i - giorniJie[k]
            add('T4 giorni dal Jie: %s | segue il trend EMA' % ('5, 8, 13 o 21 (Fibonacci)' if n in (5, 8, 13, 21) else 'altri'), d, p)
            add('T4b giorni dal Jie %s | segue il trend EMA' % ('00-04' if n < 5 else '05-09' if n < 10 else '10-14' if n < 15 else '15+'), d, p)
f = lambda g: '%5d %5.1f%% %+6.1f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0)
print('%-88s %s | %s' % ('', '2020-23: casi  si  pip/caso', '2024-26'))
for k in sorted(R): print('%-88s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
