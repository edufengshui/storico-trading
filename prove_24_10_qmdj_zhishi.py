# Ponte del Commander O dello Zhi Shi (Edu, 24/10/2026 15:40: "Il Zhi Shi ha fatto da ponte", EURJPY 22/10).
exec(open('/home/claude/qm/misura4.py').read().split("print(f'{\"variante\"")[0])
from collections import defaultdict
def zs(ch): return next((p for p,c in ch.items() if p!='5' and c['zs']),None)
def esito5(r,chi):
    w,why=esito(r,'oraria','ora',1)
    if w is None or 'controlla' not in why: return w,why,''
    ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora']))
    ctrl,sub=(a,b) if CTL[PEL[a]]==PEL[b] else (b,a)
    ponti=[]
    for nome,p in (('Commander',cmd(ch)),('Zhi Shi',zs(ch))):
        if nome in chi and p and p not in (a,b) and GEN[PEL[ctrl]]==PEL[p] and GEN[PEL[p]]==PEL[sub]: ponti.append(nome)
    return ((not w) if ponti else w), why, '+'.join(ponti)
for chi in (('Commander',),('Zhi Shi',),('Commander','Zhi Shi')):
    print(' / '.join(chi).ljust(24),'  '.join(f'{n}: '+st([pnl(r,w) for r in sel for w,_,_ in [esito5(r,chi)] if w is not None]) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
print('\nSolo carte col ponte (Commander o Zhi Shi):')
for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    g=defaultdict(list)
    for r in sel:
        w,why,p=esito5(r,('Commander','Zhi Shi'))
        if p: g[p].append(pnl(r,w))
    print(' ',n,'  '.join(f'{k}: '+st(v) for k,v in sorted(g.items())))
r=[x for x in V if x['cross']=='EURJPY' and x['date']=='2026-10-22'][0]; print('EURJPY 22/10',esito5(r,('Commander','Zhi Shi')))
