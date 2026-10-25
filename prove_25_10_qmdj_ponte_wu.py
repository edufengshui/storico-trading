# Edu 25/10/2026 10:34 (EURJPY 19/12/2024): "lo stelo Wu e la porta Birth sono quasi sempre indicatori economici, possono fare da ponte,
# proprio come Zhi Fu e Zhi Shi. Qui Wu fa da ponte" (戊 nel cielo in Kan: Metallo -> Acqua -> Legno).
exec(open('/home/claude/qm/misura10.py').read().split("print('regola")[0])
def trova(ch,f): return next((p for p,c in ch.items() if p!='5' and f(c)),None)
ATTORI=('Commander','Zhi Shi')
def esito6(r):
    w,why=esito(r,'oraria','ora',1)
    if w is None or 'controlla' not in why: return w,why,''
    ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora'])); vu=vuoti(r['ora'])
    ctrl,sub=(a,b) if CTL[PEL[a]]==PEL[b] else (b,a)
    cand={'Commander':[cmd(ch)],'Zhi Shi':[zs(ch)],
          'Wu cielo':[p for p,c in ch.items() if p!='5' and c['t']=='戊'],
          'Wu terra':[p for p,c in ch.items() if p!='5' and c['e']=='戊'],
          'Birth':[trova(ch,lambda c:c['d']=='Birth')]}
    ponti=[n for n in ATTORI for p in cand[n] if p and p not in (a,b) and not vuoto(p,ch,vu) and GEN[PEL[ctrl]]==PEL[p] and GEN[PEL[p]]==PEL[sub]]
    return ((not w) if ponti else w), why, '+'.join(ponti)
def run():
    out=[]
    for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
        x=[]
        for r in sel:
            RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]})
            w,_=esito9(r,1,'ribalta')
            if w is not None: x.append(pnl(r,w))
        out.append(f'{n}: '+st(x))
    return '  '.join(out)
for at in (('Commander','Zhi Shi'),('Commander','Zhi Shi','Wu cielo'),('Commander','Zhi Shi','Birth'),('Commander','Zhi Shi','Wu cielo','Birth'),('Commander','Zhi Shi','Wu cielo','Wu terra','Birth')):
    ATTORI=at; print(' + '.join(at).ljust(48),run())
ATTORI=('Commander','Zhi Shi','Wu cielo','Birth')
r=[x for x in TE if x['cross']=='EURJPY' and x['date']=='2024-12-19'][0]; RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]}); print(esito6(r), esito9(r,1,'ribalta'))
