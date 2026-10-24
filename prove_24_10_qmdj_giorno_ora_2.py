# Regola di Edu (24/10/2026, seconda): forza = timeliness sul mese + stagione; vuoti del giorno (variante: dell'ora);
# palazzo vuoto a meta' (due rami, uno vuoto): vuoto solo se lo stelo del di pan ha la polarita' del ramo vuoto; vuoto intero = forza 0.
# Controllo: vince chi controlla, salvo 反侮 se il controllato e' piu' forte. Generazione: vince il generato. Stesso palazzo/elemento: statistica.
import json, math
from collections import defaultdict
exec(open('/home/claude/qm/misura2.py').read().split("print('spread")[0])
SEAS={'寅':'L','卯':'L','辰':'L','巳':'F','午':'F','未':'F','申':'M','酉':'M','戌':'M','亥':'W','子':'W','丑':'W'}
YANGB=set('子寅辰午申戌'); YANGS=set('甲丙戊庚壬')
def vuoto(p,ch,vu):
    if not vu: return False
    rami=PBR[p]; dentro=[b for b in rami if b in vu]
    if not dentro: return False
    if len(dentro)==len(rami): return True
    s=ch[p]['e']   # stelo del di pan
    return (s in YANGS)==(dentro[0] in YANGB)
def forza(p,ch,mb,vu,stag):
    if p is None: return None
    if vuoto(p,ch,vu): return 0
    s=tempo(PEL[p],BEL[mb])
    return s+(tempo(PEL[p],SEAS[mb]) if stag else 0)
def esito(r,carta,vsrc,stag):
    ch=r['po'] if carta=='oraria' else r['pg']
    if not ch: return None,'—'
    mb=r['mese'][1]; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora']))
    vu=vuoti(r['giorno']) if vsrc=='giorno' else vuoti(r['ora']) if vsrc=='ora' else None
    sa,sb=forza(a,ch,mb,vu,stag),forza(b,ch,mb,vu,stag)
    if a is None or b is None: return None,'—'
    if a==b: return None,'stesso palazzo'
    if PEL[a]==PEL[b]: return None,'stesso elemento'+(' giorno piu\' forte' if sa>sb else ' ora piu\' forte' if sb>sa else ' pari')
    return vince(a,b,sa,sb,'relazione')
print(f'{"variante":40s}{"2020-23":>28s}{"2024-26":>28s}{"vivo":>28s}')
for carta in ('oraria','giornaliera'):
  for stag in (1,0):
    for vsrc in ('giorno','ora'):
        riga=[]
        for sel in (TR,TE,V):
            x=[pnl(r,w) for r in sel for w,_ in [esito(r,carta,vsrc,stag)] if w is not None]
            riga.append(st(x))
        print(f'{carta+(" · mese+stagione" if stag else " · solo mese")+" · vuoti "+vsrc:40s}'+''.join(f'{s:>28s}' for s in riga))
print('\nStesso palazzo / stesso elemento (carta oraria, mese+stagione, vuoti del giorno) — risultato se SI SEGUE il trend:')
for nome,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    g=defaultdict(list)
    for r in sel:
        w,why=esito(r,'oraria','giorno',1)
        if why.startswith('stesso'): g[why].append(pnl(r,True))
    print(' '+nome); [print(f'   {k:34s}{st(v)}') for k,v in sorted(g.items())]
print('\nDettaglio verdetti (oraria, mese+stagione, vuoti del giorno):')
for nome,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    g=defaultdict(list)
    for r in sel:
        w,why=esito(r,'oraria','giorno',1)
        if w is not None: g[why].append(pnl(r,w))
    print(' '+nome); [print(f'   {k:34s}{st(v)}') for k,v in sorted(g.items())]
