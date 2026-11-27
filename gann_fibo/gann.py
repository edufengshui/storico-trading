# 27/11/2026 (Edu: "puoi provare tu diverse combinazioni [del metodo Gann] da usare nel day trade forex").
# Prova di regole alla Gann sullo storico orario (full1h.json), stessa convenzione dei trade: entrata apertura 00:00 GMT,
# uscita chiusura delle 21:00 GMT, lun-ven. Ogni regola usa solo i giorni PRIMA del giorno del trade (piu' l'apertura).
# Due periodi: 2020-23 e 2024-26 (fino al 16/10/2026). Pip prima dello spread.
import json, sys, math, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']
pf = lambda c: 100 if c.endswith('JPY') else 10000
def giorni(c):
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    out = []
    for d in sorted(by):
        if dt.date.fromisoformat(d).weekday() > 4: continue
        bb = [b for b in by[d] if b['t'][11:13] <= '21']
        o = [b for b in bb if b['t'][11:13] == '00']; cl = [b for b in bb if b['t'][11:13] == '21']
        if not o or not cl: continue
        v = [x for b in bb for x in (b['o'], b['c'])]
        out.append(dict(d=d, o=o[0]['o'], c=cl[0]['c'], h=max(v), l=min(v)))
    return out
R = defaultdict(lambda: [[0, 0, 0.0], [0, 0, 0.0]])
def add(k, d, sig, mv):
    if sig == 0: return
    g = R[k][0 if d < '2024-01-01' else 1]; p = sig * mv; g[0] += 1; g[1] += p > 0; g[2] += p
CYC = [30, 45, 60, 90, 120, 135, 144, 180, 225, 270, 360]
for c in H:
    G = giorni(c); P = pf(c); n = len(G)
    cl = [g['c'] for g in G]; hi = [g['h'] for g in G]; lo = [g['l'] for g in G]
    dates = [dt.date.fromisoformat(g['d']) for g in G]
    ema = []; k = 2 / 13
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + k * (x - ema[-1]))
    # swing alla Gann: massimo/minimo con 2 barre piu' basse/alte ai lati, confermato 2 giorni dopo
    swH = [None] * n; swL = [None] * n; lastH = lastL = None; prevH = prevL = None; swTrend = [0] * n; cur = 0
    swHL = [0] * n  # struttura: massimi e minimi crescenti / decrescenti
    for i in range(n):
        j = i - 2
        if j >= 2:
            if hi[j] == max(hi[j-2:j+3]): prevH, lastH = lastH, hi[j]
            if lo[j] == min(lo[j-2:j+3]): prevL, lastL = lastL, lo[j]
        if lastH and cl[i] > lastH: cur = 1
        if lastL and cl[i] < lastL: cur = -1
        swTrend[i] = cur
        if prevH and prevL: swHL[i] = 1 if (lastH > prevH and lastL > prevL) else -1 if (lastH < prevH and lastL < prevL) else 0
    for i in range(260, n):
        g = G[i]; d = g['d']; O = g['o']; mv = (g['c'] - O) * P
        y = i - 1
        tr = 1 if ema[y] > ema[y-1] else -1 if ema[y] < ema[y-1] else 0
        add('00 base: segue il trend EMA12', d, tr, mv)
        add('00 base: sempre LONG', d, 1, mv)
        atr = sum(hi[j] - lo[j] for j in range(y-19, y+1)) / 20
        S = {}
        # --- 1. regola del 50% (meta' del campo degli ultimi N giorni)
        for N in (10, 20, 60, 120):
            Hh = max(hi[y-N+1:y+1]); Ll = min(lo[y-N+1:y+1]); mid = (Hh + Ll) / 2
            s = 1 if O > mid else -1; S['50_%d' % N] = s
            add('01 meta del campo %3d giorni: sopra LONG, sotto SHORT' % N, d, s, mv)
            # --- 2. ottavi
            z = min(7, int(8 * (O - Ll) / (Hh - Ll))) if Hh > Ll else 4
            if N in (20, 60):
                add('02 ottavi %3d g: ottavo alto (7-8/8) -> SHORT' % N, d, -1 if z == 7 else 0, mv)
                add('02 ottavi %3d g: ottavo basso (0-1/8) -> LONG' % N, d, 1 if z == 0 else 0, mv)
                add('02 ottavi %3d g: fra 4/8 e 7/8 -> LONG' % N, d, 1 if 4 <= z <= 6 else 0, mv)
                add('02 ottavi %3d g: fra 1/8 e 4/8 -> SHORT' % N, d, -1 if 1 <= z <= 3 else 0, mv)
        # --- 3. angoli dal perno (massimo/minimo degli ultimi N giorni), scala = campo medio giornaliero / q
        for N in (30, 60):
            w = range(y-N+1, y+1); iH = max(w, key=lambda j: hi[j]); iL = min(w, key=lambda j: lo[j])
            for q, nome in ((2, '2x1 (ripido)'), (4, '1x1'), (8, '1x2 (piatto)')):
                st = atr / q
                if iL > iH: line = lo[iL] + st * (i - iL); s = 1 if O > line else -1    # ultimo perno = minimo: angolo che sale
                else: line = hi[iH] - st * (i - iH); s = -1 if O < line else 1          # ultimo perno = massimo: angolo che scende
                S['ang_%d_%d' % (N, q)] = s
                add('03 angolo %s dal perno %d g: di qua col perno, oltre contro' % (nome, N), d, s, mv)
            # --- 6. ritracciamento della gamba (terzi e meta')
            leg = hi[iH] - lo[iL]
            if leg > 0 and iL != iH:
                up = iH > iL; r = (hi[iH] - O) / leg if up else (O - lo[iL]) / leg; dirg = 1 if up else -1
                zona = 'meno di 1/3' if r < 1/3 else 'fra 1/3 e 1/2' if r < .5 else 'fra 1/2 e 2/3' if r < 2/3 else 'oltre 2/3'
                add('06 ritracciamento gamba %d g %-13s -> con la gamba' % (N, zona), d, dirg, mv)
        # --- 4. cicli di tempo dal perno maggiore (250 giorni) e minore (60): giorno di ciclo -> svolta contro gli ultimi 5 giorni
        d5 = 1 if cl[y] > cl[y-5] else -1
        for N, nm in ((250, 'maggiore'), (60, 'minore')):
            w = range(y-N+1, y+1); iH = max(w, key=lambda j: hi[j]); iL = min(w, key=lambda j: lo[j])
            dist = [(dates[i] - dates[iH]).days, (dates[i] - dates[iL]).days]
            hit = any(abs(x - cy) <= 1 for x in dist for cy in CYC)
            S['cic_' + nm] = hit
            add('04 giorno di ciclo dal perno %s: svolta (contro gli ultimi 5 g)' % nm, d, -d5 if hit else 0, mv)
            add('04 giorno di ciclo dal perno %s: contro il trend EMA' % nm, d, -tr if hit else 0, mv)
        add('04 confronto: contro gli ultimi 5 giorni, tutti i giorni', d, -d5, mv)
        # --- 5. quadrato del 9: livelli a 45 gradi dal perno dei 60 giorni; ieri ha chiuso oltre un livello -> prosegue
        w = range(y-60+1, y+1); Ll = min(lo[y-59:y+1]) * P; Hh = max(hi[y-59:y+1]) * P
        for passo, nm in ((0.25, '45'), (0.5, '90')):
            lv = set()
            for kk in range(1, 40):
                lv.add((math.sqrt(Ll) + passo * kk) ** 2); x = math.sqrt(Hh) - passo * kk
                if x > 0: lv.add(x * x)
            a, b = cl[y-1] * P, cl[y] * P; s = 0
            for L in lv:
                if a < L <= b: s = 1
                if a > L >= b: s = -1
            S['q9_' + nm] = s
            add('05 quadrato del 9 (%s gradi): chiusura oltre un livello -> prosegue' % nm, d, s, mv)
            near = min(lv, key=lambda L: abs(L - O * P)); dist = O * P - near
            add('05 quadrato del 9 (%s gradi): apre entro 10 pip sopra un livello -> LONG' % nm, d, 1 if 0 <= dist <= 10 else 0, mv)
            add('05 quadrato del 9 (%s gradi): apre entro 10 pip sotto un livello -> SHORT' % nm, d, -1 if -10 <= dist < 0 else 0, mv)
        # --- 7. swing alla Gann
        add('07 swing: chiusura oltre l\'ultimo massimo/minimo di swing -> segue', d, swTrend[y], mv)
        add('07 swing: massimi e minimi crescenti/decrescenti -> segue', d, swHL[y], mv)
        # --- combinazioni
        def comb(nome, *ss):
            add(nome, d, ss[0] if all(x == ss[0] and x != 0 for x in ss) else 0, mv)
        comb('10 comb: trend EMA + meta campo 20', tr, S['50_20'])
        comb('10 comb: trend EMA + meta campo 60', tr, S['50_60'])
        comb('10 comb: trend EMA + swing', tr, swTrend[y])
        comb('10 comb: trend EMA + angolo 1x1 (60)', tr, S['ang_60_4'])
        comb('10 comb: trend EMA + angolo 1x1 (30)', tr, S['ang_30_4'])
        comb('10 comb: swing + angolo 1x1 (60) + meta campo 60', swTrend[y], S['ang_60_4'], S['50_60'])
        comb('10 comb: trend EMA + swing + angolo 1x1 (60) + meta 60', tr, swTrend[y], S['ang_60_4'], S['50_60'])
        comb('10 comb: trend EMA + quadrato del 9 (45)', tr, S['q9_45'])
        add('10 comb: trend EMA CONTRO meta campo 20 -> col trend', d, tr if S['50_20'] == -tr else 0, mv)
        add('10 comb: trend EMA CONTRO angolo 1x1 (30) -> col trend', d, tr if S['ang_30_4'] == -tr else 0, mv)
        add('10 comb: trend EMA, NON in giorno di ciclo', d, tr if not (S['cic_maggiore'] or S['cic_minore']) else 0, mv)
        add('10 comb: trend EMA, in giorno di ciclo', d, tr if (S['cic_maggiore'] or S['cic_minore']) else 0, mv)
        add('11 per cross: trend EMA + swing | ' + c, d, tr if swTrend[y] == tr else 0, mv)
f = lambda g: '%5d %5.1f%% %+6.1f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0)
print('%-78s %s | %s' % ('regola', '2020-23: trade  vinti  pip/trade', '2024-26'))
for k in sorted(R): print('%-78s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
