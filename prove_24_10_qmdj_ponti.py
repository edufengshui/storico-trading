# Commander e Zhi Shi fanno sempre da ponte, se il loro palazzo non e' vuoto (Edu, 24/10/2026 15:42). Vuoti del 旬 dell'ora.
exec(open('/home/claude/qm/misura5.py').read().split("for chi in")[0])
def esito6(r):
    w,why=esito(r,'oraria','ora',1)
    if w is None or 'controlla' not in why: return w,why,''
    ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora'])); vu=vuoti(r['ora'])
    ctrl,sub=(a,b) if CTL[PEL[a]]==PEL[b] else (b,a)
    ponti=[n for n,p in (('Commander',cmd(ch)),('Zhi Shi',zs(ch))) if p and p not in (a,b) and not vuoto(p,ch,vu) and GEN[PEL[ctrl]]==PEL[p] and GEN[PEL[p]]==PEL[sub]]
    return ((not w) if ponti else w), why, '+'.join(ponti)
for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    print(n.ljust(8),'regola:',st([pnl(r,w) for r in sel for w,_,_ in [esito6(r)] if w is not None]))
    g=defaultdict(list)
    for r in sel:
        w,_,p=esito6(r)
        if p: g[p].append(pnl(r,w))
    print('         ponti:','  '.join(f'{k}: '+st(v) for k,v in sorted(g.items())))
