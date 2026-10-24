import json, math, sys
S=json.load(open('/home/claude/qm/storico.json')); V=json.load(open('/home/claude/qm/vivo.json'))
ST='甲乙丙丁戊己庚辛壬癸'; BR='子丑寅卯辰巳午未申酉戌亥'
XUN={0:'戊',10:'己',20:'庚',30:'辛',40:'壬',50:'癸'}
def i60(gz): return next(i for i in range(60) if ST[i%10]+BR[i%12]==gz)
def stem_of(gz):
    s=gz[0]
    return XUN[i60(gz)//10*10] if s=='甲' else s
PEL={'1':'W','2':'E','3':'L','4':'L','6':'M','7':'M','8':'E','9':'F'}  # L=legno
GEN={'L':'F','F':'E','E':'M','M':'W','W':'L'}; CTL={'L':'E','E':'W','W':'F','F':'M','M':'L'}
def pal(ch,s):
    for p,c in ch.items():
        if p!='5' and c['t']==s: return p
    for p,c in ch.items():
        if p!='5' and c['s']=='Rice': return p
    return None
def rel(a,b):
    if a is None or b is None: return None
    if a==b: return 'stesso palazzo'
    x,y=PEL[a],PEL[b]
    if x==y: return 'stesso elemento'
    if GEN[x]==y: return 'A genera B'
    if GEN[y]==x: return 'B genera A'
    if CTL[x]==y: return 'A controlla B'
    return 'B controlla A'
def flag(ch,k): return next((p for p,c in ch.items() if c[k] and p!='5'),None)
def feats(r):
    o,g=r['po'],r['pg']; dS=stem_of(r['giorno']); hS=stem_of(r['ora']); f={}
    f['A oraria: giorno(A) vs ora(B)']=rel(pal(o,dS),pal(o,hS))
    if g: f['A giornaliera: giorno(A) vs ora(B)']=rel(pal(g,dS),pal(g,hS))
    f['B oraria: ZhiFu(A) vs ZhiShi(B)']=rel(flag(o,'zf'),flag(o,'zs'))
    if g: f['B giornaliera: ZhiFu(A) vs ZhiShi(B)']=rel(flag(g,'zf'),flag(g,'zs'))
    p=pal(o,hS); f['C oraria: porta del palazzo dell\'ora']=o[p]['d'] if p else None
    if g: p=pal(g,dS); f['C giornaliera: porta del palazzo del giorno']=g[p]['d'] if p else None
    return f
SPREAD=1.5
def pnl(r,segue):
    sig=r['trend'] if segue else ('SHORT' if r['trend']=='LONG' else 'LONG')
    return (r['move'] if sig=='LONG' else -r['move'])-SPREAD
def st(rows):
    n=len(rows); 
    if not n: return '   -'
    w=sum(1 for x in rows if x>0); z=(w/n-.5)/math.sqrt(.25/n)
    return f'{n:5d} {100*w/n:5.1f}% z{z:5.2f} {sum(rows):+7.0f}'
TR=[r for r in S if r['date']<'2024-01-01']; TE=[r for r in S if r['date']>='2024-01-01']
for r in S+V: r['f']=feats(r)
print('base: seguire sempre il trend  2020-23',st([pnl(r,1) for r in TR]),'| 2024-26',st([pnl(r,1) for r in TE]),'| vivo',st([pnl(r,1) for r in V]))
keys=list(S[0]['f'])
for k in keys:
    print('\n=== '+k)
    cats=sorted({r['f'].get(k) for r in S}, key=str)
    regola={}
    for c in cats:
        a=[pnl(r,1) for r in TR if r['f'].get(k)==c]; b=[pnl(r,1) for r in TE if r['f'].get(k)==c]
        n=len(a); w=sum(1 for x in a if x>0); z=(w/n-.5)/math.sqrt(.25/n) if n else 0
        regola[c]= 1 if z>=1 else (0 if z<=-1 else None)
        print(f'  {str(c):18s} segue: 2020-23 {st(a)} | 2024-26 {st(b)}  -> {"SEGUE" if regola[c]==1 else "NON SEGUE" if regola[c]==0 else "fermo"}')
    for nome,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
        x=[pnl(r,regola[r['f'][k]]) for r in sel if r['f'].get(k) in regola and regola[r['f'][k]] is not None]
        print(f'  REGOLA (fermo dove |z|<1) {nome:8s} {st(x)}')
