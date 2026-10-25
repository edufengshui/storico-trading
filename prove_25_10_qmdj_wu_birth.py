# Edu 25/10/2026 11:57: "quando Wu controlla Birth o il contrario dovrebbe essere un'indicazione negativa indipendente dal trend: il cross va SHORT".
# Wu = palazzo dello stelo 戊 nel cielo; Birth = palazzo della porta Birth. Relazione fra gli elementi dei due palazzi (carta oraria).
exec(open('/home/claude/qm/misura14.py').read().split("for m,nm")[0])
from collections import defaultdict
def wb(r):
    ch=r['po']; w=next((p for p,c in ch.items() if p!='5' and c['t']=='戊'),None); b=next((p for p,c in ch.items() if p!='5' and c['d']=='Birth'),None)
    if not w or not b: return 'manca'
    if w==b: return 'stesso palazzo'
    x,y=PEL[w],PEL[b]
    if x==y: return 'stesso elemento'
    if CTL[x]==y: return 'Wu controlla Birth'
    if CTL[y]==x: return 'Birth controlla Wu'
    if GEN[x]==y: return 'Wu genera Birth'
    return 'Birth genera Wu'
def shortst(rows):
    x=[-r['move']-SPREAD for r in rows]; return st(x)
print('SHORT sempre (tutte le carte)'.ljust(28),'  '.join(f'{n}: '+shortst(sel) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
g={n:defaultdict(list) for n in ('2020-23','2024-26','vivo')}
for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    for r in sel: g[n][wb(r)].append(r)
keys=sorted(set(k for d in g.values() for k in d))
print('\nse si va SHORT:')
for k in keys: print(' ',k.ljust(26),'  '.join(f'{n}: '+shortst(g[n][k]) for n in g))
ctl=lambda n:[r for k in ('Wu controlla Birth','Birth controlla Wu') for r in g[n][k]]
print(' ','CONTROLLO (tutti e due)'.ljust(26),'  '.join(f'{n}: '+shortst(ctl(n)) for n in g))
