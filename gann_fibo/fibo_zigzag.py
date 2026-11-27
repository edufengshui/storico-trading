# 27/11/2026 (Edu: "Di solito il Fibonacci parte da un importante reverse del trend" - "Si" alla prova con lo zig-zag).
# Svolta = massimo/minimo dopo il quale il prezzo torna indietro di TH volte il campo medio giornaliero (20 giorni). Niente sguardo
# in avanti: la svolta B vale dal momento in cui il ritorno e' avvenuto. Gamba = dalla svolta precedente A alla svolta B.
# Livelli = ritracciamenti della gamba A->B; quando il prezzo orario raggiunge un livello (non ancora passato) si entra NEL VERSO
# DELLA GAMBA (ripresa del movimento), al prezzo orario. Ogni rapporto e' provato da solo; accanto ai rapporti di Fibonacci ci sono
# rapporti qualunque. La gamba decade se il prezzo torna oltre B, ritraccia tutto (oltre A) o nasce una svolta nuova.
#  uscita G: chiusura delle 21:00 GMT del giorno di entrata.   uscita T: obiettivo = B, stop = 0,2 gamba oltre il livello, al massimo 3 giorni.
# Pip netti di 1,5 di spread. Periodi 2020-23 | 2024-26.
import json, sys, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']
try: LIO = {x['cross'] + x['date']: x for x in json.load(open('/tmp/dump.json'))}
except Exception: LIO = {}
FIB = [0.236, 0.382, 0.5, 0.618, 0.786]; RATIOS = sorted(set(FIB + [0.3, 0.44, 0.56, 0.7, 0.9])); SP = 1.5
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
        G.append((d, pts, max(v) - min(v)))
    T = []                                              # (giorno, ora, prezzo, campo medio)
    for i in range(20, len(G)):
        atr = sum(G[j][2] for j in range(i-20, i)) / 20
        for h, p in G[i][1]: T.append((G[i][0], h, p, atr))
    n = len(T)
    # indice della chiusura (ora 22) del giorno, per ogni punto
    fine = [0] * n; last = n - 1
    for i in range(n - 1, -1, -1):
        if T[i][1] == 22: last = i
        fine[i] = last
    cl = [1 if a > b else -1 if a < b else 0 for a, b in [(0, 0)]]  # segnaposto
    for TH in (0.5, 1.0, 1.5, 3.0):
        trend = 1; ext = T[0][2]; piv = T[0][2]; setup = None
        for i in range(1, n):
            d, h, p, atr = T[i]
            # --- livelli della gamba attiva
            if setup:
                A, B, dr, pend = setup; leg = abs(B - A); retr = dr * (B - p) / leg
                if retr >= 1 or retr <= 0: setup = None
                else:
                    for r in [r for r in pend if retr >= r]:
                        pend.remove(r)
                        j = fine[i] if fine[i] > i else (fine[i + 1] if i + 1 < n else i)
                        pG = dr * (T[j][2] - p) * P - SP
                        pT = None
                        for k in range(i + 1, min(n, i + 67)):
                            rk = dr * (B - T[k][2]) / leg
                            if rk >= r + 0.2 or rk <= 0: pT = dr * (T[k][2] - p) * P - SP; break
                        if pT is None: pT = dr * (T[min(n - 1, i + 66)][2] - p) * P - SP
                        nm = ('FIB %.3f' if r in FIB else 'qualunque %.3f') % r
                        add('svolta %.1f campi | %-15s | G uscita alle 21:00' % (TH, nm), d, pG)
                        add('svolta %.1f campi | %-15s | T obiettivo/stop' % (TH, nm), d, pT)
                        tutti = 'FIB tutti' if r in FIB else 'qualunque tutti'
                        add('svolta %.1f campi | = %-15s | G uscita alle 21:00' % (TH, tutti), d, pG)
                        add('svolta %.1f campi | = %-15s | T obiettivo/stop' % (TH, tutti), d, pT)
                        if r in FIB and TH in (1.0, 1.5):
                            x = LIO.get(c + d); ld = x.get('liDir') if x and x.get('liv') == 'LI' else None; vs = 'LONG' if dr > 0 else 'SHORT'
                            add('Z svolta %.1f | FIB tutti | %s | G' % (TH, 'Lio tace' if not ld else 'Lio nello stesso verso' if ld == vs else 'Lio nel verso opposto'), d, pG)
                            if x and x.get('trend'): add('Z svolta %.1f | FIB tutti | gamba %s | G' % (TH, 'col trend EMA' if x['trend'] == vs else 'contro il trend EMA'), d, pG)
            # --- zig-zag
            if trend == 1:
                if p > ext: ext = p
                elif p <= ext - TH * atr:
                    A, B = piv, ext
                    if B > A: r0 = (B - p) / (B - A); setup = (A, B, 1, [r for r in RATIOS if r > r0]) if r0 < 1 else None
                    trend = -1; piv = ext; ext = p
            else:
                if p < ext: ext = p
                elif p >= ext + TH * atr:
                    A, B = piv, ext
                    if B < A: r0 = (p - B) / (A - B); setup = (A, B, -1, [r for r in RATIOS if r > r0]) if r0 < 1 else None
                    trend = 1; piv = ext; ext = p
f = lambda g: '%5d %5.1f%% %+6.1f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0)
print('%-66s %s | %s' % ('', '2020-23: trade vinti pip/trade', '2024-26'))
for k in sorted(R): print('%-66s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
