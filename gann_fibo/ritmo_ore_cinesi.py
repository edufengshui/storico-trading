# 27/11/2026 (Edu: "Si', pensavo alle ore cinesi"). Dentro il trend EMA12, le ORE CINESI (pilastro dell'ora, GMT: Zi = 23-01, Chou =
# 01-03 ...) fanno ritracciare o accelerare? Barre orarie; movimento dell'ora nel verso del trend diviso per il campo medio giornaliero
# (millesimi di campo); "ampiezza" = grandezza del movimento rispetto alla media di quell'ora dell'orologio per quel cross (1,00 = normale).
# Relazioni provate: ramo dell'ora col ramo del giorno, col vuoto del giorno, col ramo del mese, col ramo del seme del cross;
# stelo dell'ora con lo stelo del giorno. Periodi 2020-23 | 2024-26; conta solo cio' che tiene in tutti e due (t oltre 2).
# NOTA: le ore dello schema del Commander (qimen) erano gia' state misurate il 28/10/2026 (S63): come le ore normali.
import json, sys, math, datetime as dt, bisect
from collections import defaultdict
import numpy as np
H = json.load(open(sys.argv[1]))['crosses']; JQ = [j for j in json.load(open('/tmp/gann/jieqi.json')) if j['jie']]
MB = {'立春':2,'LI_CHUN':2,'惊蛰':3,'JING_ZHE':3,'清明':4,'立夏':5,'芒种':6,'小暑':7,'立秋':8,'白露':9,'寒露':10,'立冬':11,'大雪':0,'DA_XUE':0,'小寒':1,'XIAO_HAN':1}
JT = [j['t'] for j in JQ]; JB = [MB[j['nome']] for j in JQ]
BR = ['Zi','Chou','Yin','Mao','Chen','Si','Wu','Wei','Shen','You','Xu','Hai']
REF = dt.date(2026, 11, 27); REFN = 41                     # 27/11/2026 = Yi Si (indice 41 nel ciclo dei 60)
def giorno60(d): return (REFN + (d - REF).days) % 60
LIUHE = {0:1,1:0,2:11,11:2,3:10,10:3,4:9,9:4,5:8,8:5,6:7,7:6}
HAI = {0:7,7:0,1:6,6:1,2:5,5:2,3:4,4:3,8:11,11:8,9:10,10:9}
XING = {(2,5),(5,8),(8,2),(1,10),(10,7),(7,1),(0,3),(3,0),(4,4),(6,6),(9,9),(11,11)}
EL = [0,0,1,1,2,2,3,3,4,4]                                 # elemento dello stelo: legno fuoco terra metallo acqua
def relBr(a, b):
    if a == b: return 'stesso ramo'
    if (a - b) % 12 == 6: return 'clash'
    if LIUHE[a] == b: return 'combinazione (liu he)'
    if (a - b) % 4 == 0: return 'tre armonie (san he)'
    if (a, b) in XING or (b, a) in XING: return 'penalita'
    if HAI[a] == b: return 'danno (hai)'
    return 'nessuna'
def relSt(h, g):
    if h == g: return 'stesso stelo'
    if (h - g) % 10 == 5: return 'combinazione'
    if (h - g) % 10 in (4, 6) and EL[h] != EL[g] and ((EL[h] + 2) % 5 == EL[g] or (EL[g] + 2) % 5 == EL[h]) and (h % 2 == g % 2): return 'clash/controllo stessa polarita'
    eh, eg = EL[h], EL[g]
    if eh == eg: return 'stesso elemento'
    if (eh + 1) % 5 == eg: return 'ora genera il giorno'
    if (eg + 1) % 5 == eh: return 'giorno genera l\'ora'
    if (eh + 2) % 5 == eg: return 'ora controlla il giorno'
    return 'giorno controlla l\'ora'
ACC = defaultdict(lambda: [[], []]); AMP = defaultdict(lambda: [[], []])
f3 = lambda p: (str(p).replace('.', '').lstrip('0'))[: 2 if abs(p) < 1 else 3]
for c in H:
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    G = []
    for d in sorted(by):
        if dt.date.fromisoformat(d).weekday() > 4: continue
        bb = sorted(by[d], key=lambda b: b['t']); hs = {b['t'][11:13] for b in bb}
        if '00' not in hs or '21' not in hs: continue
        v = [x for b in bb if b['t'][11:13] <= '21' for x in (b['o'], b['c'])]
        G.append((d, bb, max(v) - min(v), [b for b in bb if b['t'][11:13] == '21'][0]['c']))
    cl = [g[3] for g in G]; ema = []
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + (2/13) * (x - ema[-1]))
    sl = [0] + [1 if ema[i] > ema[i-1] else -1 if ema[i] < ema[i-1] else 0 for i in range(1, len(G))]
    # ampiezza media per ora dell'orologio
    mh = defaultdict(list)
    for i in range(21, len(G)):
        atr = sum(G[j][2] for j in range(i-20, i)) / 20
        for b in G[i][1]: mh[int(b['t'][11:13])].append(abs(b['c'] - b['o']) / atr)
    mh = {h: sum(v) / len(v) for h, v in mh.items()}
    for i in range(21, len(G)):
        d, bb, _, _ = G[i]; tr = sl[i-1]
        if not tr: continue
        atr = sum(G[j][2] for j in range(i-20, i)) / 20; per = 0 if d < '2024-01-01' else 1
        D = dt.date.fromisoformat(d); seed = int(f3(bb[0]['o'])); sb = (seed - 1) % 12
        for b in bb:
            h = int(b['t'][11:13]); r = tr * (b['c'] - b['o']) / atr; am = abs(b['c'] - b['o']) / atr / mh[h] if mh[h] else 1
            g60 = giorno60(D + dt.timedelta(days=1)) if h == 23 else giorno60(D)
            gs, gb = g60 % 10, g60 % 12
            hb = ((h + 1) // 2) % 12; hst = ((gs % 5) * 2 + hb) % 10
            xun = (gb - gs) % 12; vuoti = ((xun - 2) % 12, (xun - 1) % 12)
            k = bisect.bisect_right(JT, b['t']) - 1; mb = JB[k] if k >= 0 else None
            keys = ['1 ramo dell\'ora: %02d %s' % (hb, BR[hb]),
                    '2 ramo dell\'ora col ramo del giorno: ' + relBr(hb, gb),
                    '3 ramo dell\'ora nel vuoto del giorno: ' + ('si' if hb in vuoti else 'no'),
                    '5 stelo dell\'ora con lo stelo del giorno: ' + relSt(hst, gs),
                    '6 ramo dell\'ora col ramo del seme: ' + relBr(hb, sb)]
            if mb is not None: keys.append('4 ramo dell\'ora col ramo del mese: ' + relBr(hb, mb))
            if (hb - gb) % 12 == 6 and mb is not None and (hb - mb) % 12 == 6: keys.append('7 ramo dell\'ora clasha giorno E mese')
            if (hb - gb) % 12 == 6 and hb in vuoti: keys.append('7 ramo dell\'ora clasha il giorno ed e\' vuoto')
            if (hb - sb) % 12 == 6 and (hb - gb) % 12 == 6: keys.append('7 ramo dell\'ora clasha seme E giorno')
            for kk in keys: ACC[kk][per].append(r); AMP[kk][per].append(am)
def st(v):
    v = np.array(v); n = len(v)
    if n < 2: return n, 0, 0
    m = v.mean(); s = v.std() / math.sqrt(n); return n, m, (m / s if s else 0)
print('%-62s %s' % ('', '2020-23: ore, verso (millesimi), t, ampiezza | 2024-26'))
for k in sorted(ACC):
    a = st(ACC[k][0]); b = st(ACC[k][1]); aa = np.mean(AMP[k][0]) if AMP[k][0] else 0; ab = np.mean(AMP[k][1]) if AMP[k][1] else 0
    fl = '  <== CONTRO il trend nei due periodi' if a[2] < -2 and b[2] < -2 else '  <== COL trend nei due periodi' if a[2] > 2 and b[2] > 2 else ''
    fa = '  [ampiezza diversa nei due periodi: %s]' % ('piu grande' if aa > 1.04 else 'piu piccola') if (aa > 1.04 and ab > 1.04) or (aa < 0.96 and ab < 0.96) else ''
    print('%-62s %6d %+6.1f t %+5.1f amp %.2f | %6d %+6.1f t %+5.1f amp %.2f%s%s' % (k, a[0], a[1]*1000, a[2], aa, b[0], b[1]*1000, b[2], ab, fl, fa))
