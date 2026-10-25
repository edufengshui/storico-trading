# Edu 25/10/2026 12:46 (USDJPY 19/10): "una carta fan yin (反吟) non segue quasi mai".
# Fan yin della carta: il cielo e' rovesciato rispetto alla terra (stelo del cielo di ogni palazzo = stelo della terra del palazzo opposto).
exec(open('/home/claude/qm/misura14.py').read().split("for m,nm")[0])
MODO=1
OPP={'1':'9','9':'1','2':'8','8':'2','3':'7','7':'3','4':'6','6':'4'}
def fanyin(ch): return all(ch[p]['t']==ch[OPP[p]]['e'] for p in OPP)
def fuyin(ch): return all(ch[p]['t']==ch[p]['e'] for p in OPP)
for nome,f in (('fan yin',fanyin),('fu yin',fuyin)):
    print(f'== {nome}: quante volte il trend SEGUE (tutte le carte)')
    for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
        x=[r for r in sel if f(r['po'])]
        seg=[(r['move'] if r['trend']=='LONG' else -r['move'])-SPREAD for r in x]
        print('  ',n,'carte',len(x),'· segue',st(seg))
FY=0
_e9b=esito9
def esito9(r,vg,cm):
    w,why=_e9b(r,vg,cm)
    if FY and fanyin(r['po']): return False,why+' · fan yin: non segue'
    return w,why
for m,nm in ((0,'attuale'),(1,'fan yin -> non segue')):
    FY=m; print(nm.ljust(24),run())
r=[x for x in V if x['cross']=='USDJPY' and x['date']=='2026-10-19'][0]; print('USDJPY 19/10 fan yin:',fanyin(r['po']))
