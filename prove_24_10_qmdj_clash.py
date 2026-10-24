# Clash interni (Edu, 24/10/2026 15:44): un palazzo con clash interno (stelo del cielo contro stelo della terra: 甲庚 乙辛 丙壬 丁癸)
# "potrebbe non vincere o non fare da ponte".
exec(open('/home/claude/qm/misura6.py').read().split("for n,sel")[0])
CL={'甲':'庚','庚':'甲','乙':'辛','辛':'乙','丙':'壬','壬':'丙','丁':'癸','癸':'丁'}
def clash(ch,p): c=ch[p]; return CL.get(c['t'])==c['e']
def esito7(r,modo):
    w,why=esito(r,'oraria','ora',1)
    if w is None: return None,why,''
    ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora'])); vu=vuoti(r['ora']); tag=''
    if 'controlla' in why:
        ctrl,sub=(a,b) if CTL[PEL[a]]==PEL[b] else (b,a)
        ponti=[n for n,p in (('Commander',cmd(ch)),('Zhi Shi',zs(ch))) if p and p not in (a,b) and not vuoto(p,ch,vu)
               and not (modo>=1 and clash(ch,p)) and GEN[PEL[ctrl]]==PEL[p] and GEN[PEL[p]]==PEL[sub]]
        if ponti: w=not w; tag='ponte'
    if modo>=2:
        vinc=a if w else b
        if clash(ch,vinc): tag+=' clash vincitore'; w=None if modo==2 else (not w)
    return w,why,tag
NOMI={0:'senza clash',1:'clash: niente ponte',2:'+ vincitore in clash: fermo',3:'+ vincitore in clash: ribalta'}
for m in range(4):
    print(NOMI[m].ljust(30),'  '.join(f'{n}: '+st([pnl(r,w) for r in sel for w,_,_ in [esito7(r,m)] if w is not None]) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
print('\nCarte col vincitore in clash, se il vincitore vince comunque:')
for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    x=[]
    for r in sel:
        w,_,t=esito7(r,1)
        if w is None: continue
        ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora']))
        if clash(ch,a if w else b): x.append(pnl(r,w))
    print(' ',n,st(x))
