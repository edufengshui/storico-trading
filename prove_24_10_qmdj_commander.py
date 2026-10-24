# Regola di Edu (24/10/2026, 15:17): come prima + Commander (值符). Se il palazzo del Commander fa da PONTE fra il palazzo che
# controlla e quello controllato (chi controlla genera il Commander, il Commander genera il controllato), l'esito si ribalta.
import json, math
from collections import defaultdict
src=open('/home/claude/qm/misura3.py').read()
exec(src.split("print(f'{\"variante\"")[0])
def cmd(ch): return next((p for p,c in ch.items() if p!='5' and c['g']=='Commander'),None)
def esito4(r,carta,vsrc,stag,vuotoNonPonte):
    w,why=esito(r,carta,vsrc,stag)
    if w is None or 'controlla' not in why: return w,why,False
    ch=r['po'] if carta=='oraria' else r['pg']; mb=r['mese'][1]
    a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora']))
    # chi controlla davvero: il vincitore del controllo (反侮 incluso) -> controllante = vincitore, controllato = perdente
    ctrl,sub=(a,b) if CTL[PEL[a]]==PEL[b] else (b,a)   # controllo degli elementi, 反侮 incluso
    c=cmd(ch)
    if c is None or c in (a,b): return w,why,False
    vu=vuoti(r['giorno']) if vsrc=='giorno' else vuoti(r['ora'])
    if vuotoNonPonte and vuoto(c,ch,vu): return w,why,False
    ponte = GEN[PEL[ctrl]]==PEL[c] and GEN[PEL[c]]==PEL[sub]
    return ((not w) if ponte else w), why+(' · PONTE del Commander' if ponte else ''), ponte
print(f'{"variante":52s}{"2020-23":>28s}{"2024-26":>28s}{"vivo":>28s}')
for carta in ('oraria','giornaliera'):
  for stag,vsrc in ((1,'giorno'),(1,'ora'),(0,'ora')):
    for vnp in (0,1):
        riga=[]
        for sel in (TR,TE,V):
            x=[pnl(r,w) for r in sel for w,_,_ in [esito4(r,carta,vsrc,stag,vnp)] if w is not None]
            riga.append(st(x))
        nm=carta+(" · mese+stag" if stag else " · solo mese")+" · vuoti "+vsrc+(" · Cmd vuoto no ponte" if vnp else "")
        print(f'{nm:52s}'+''.join(f'{s:>28s}' for s in riga))
print('\nSolo le carte col PONTE del Commander (oraria, mese+stagione, vuoti del giorno), esito ribaltato:')
for nome,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    g=defaultdict(list)
    for r in sel:
        w,why,p=esito4(r,'oraria','giorno',1,0)
        if p: g[why].append(pnl(r,w))
    print(' '+nome); [print(f'   {k:50s}{st(v)}') for k,v in sorted(g.items())]
