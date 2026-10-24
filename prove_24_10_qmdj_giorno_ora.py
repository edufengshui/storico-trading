# Regola di Edu (24/10/2026): stelo del giorno = trend, stelo dell'ora = la giornata. Si confrontano i palazzi e si vede chi vince,
# con timeliness (旺相休囚死 sul mese) e vuoti dei palazzi. Vince il giorno -> SEGUE il trend; vince l'ora -> NON SEGUE.
import json, math
exec(open('/home/claude/qm/misura.py').read().split("SPREAD=1.5")[0].split("def feats")[0])
SPREAD=1.5
BEL={'子':'W','亥':'W','寅':'L','卯':'L','巳':'F','午':'F','申':'M','酉':'M','辰':'E','戌':'E','丑':'E','未':'E'}
PBR={'1':'子','8':'丑寅','3':'卯','4':'辰巳','9':'午','2':'未申','7':'酉','6':'戌亥'}
def tempo(pel,mel):  # 旺4 相3 休2 囚1 死0
    if pel==mel: return 4
    if GEN[mel]==pel: return 3
    if GEN[pel]==mel: return 2
    if CTL[pel]==mel: return 1
    return 0
def vuoti(gz): i=i60(gz); s=i//10*10; return {BR[(s+10)%12],BR[(s+11)%12]}
def forza(p,mel,vu):
    if p is None: return None
    s=tempo(PEL[p],mel)
    return 0 if (vu and set(PBR[p])&vu) else s
def vince(a,b,sa,sb,modo):
    if a is None or b is None: return None,'—'
    if a==b: return None,'stesso palazzo'
    x,y=PEL[a],PEL[b]
    if modo=='forza':
        return (None if sa==sb else sa>sb),'forza'
    if x==y: return (None if sa==sb else sa>sb),'stesso elemento'
    if CTL[x]==y: return (sa>=sb),'giorno controlla ora'+('' if sa>=sb else ' (反侮)')
    if CTL[y]==x: return (not sb>=sa),'ora controlla giorno'+('' if sb>=sa else ' (反侮)')
    if GEN[x]==y: return False,'giorno genera ora'
    return True,'ora genera giorno'
def pnl(r,segue):
    sig=r['trend'] if segue else ('SHORT' if r['trend']=='LONG' else 'LONG')
    return (r['move'] if sig=='LONG' else -r['move'])-SPREAD
def st(x):
    n=len(x)
    if not n: return '    -'
    w=sum(1 for v in x if v>0); return f'{n:5d} {100*w/n:5.1f}% z{(w/n-.5)/math.sqrt(.25/n):5.2f} {sum(x):+7.0f}'
TR=[r for r in S if r['date']<'2024-01-01']; TE=[r for r in S if r['date']>='2024-01-01']
def esito(r,carta,vsrc,modo):
    ch=r['po'] if carta=='oraria' else r['pg']
    if not ch: return None,'—'
    mel=BEL[r['mese'][1]]; dS,hS=stem_of(r['giorno']),stem_of(r['ora'])
    a,b=pal(ch,dS),pal(ch,hS)
    vu=vuoti(r['ora']) if vsrc=='ora' else vuoti(r['giorno']) if vsrc=='giorno' else None
    return vince(a,b,forza(a,mel,vu),forza(b,mel,vu),modo)
print('spread 1,5 pip · vince il giorno -> SEGUE · vince l\'ora -> NON SEGUE · pari -> fermo')
print(f'{"variante":44s}{"2020-23":>28s}{"2024-26":>28s}{"vivo":>28s}')
for carta in ('oraria','giornaliera'):
  for modo in ('relazione','forza'):
    for vsrc in ('ora','giorno','nessuno'):
        riga=[]
        for sel in (TR,TE,V):
            x=[]
            for r in sel:
                w,_=esito(r,carta,vsrc,modo)
                if w is not None: x.append(pnl(r,w))
            riga.append(st(x))
        print(f'{carta+" · "+modo+" · vuoti "+vsrc:44s}'+''.join(f'{s:>28s}' for s in riga))
print('\nDettaglio, carta oraria · relazione · vuoti dell\'ora (risultato del verdetto):')
from collections import defaultdict
for nome,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
    g=defaultdict(list)
    for r in sel:
        w,why=esito(r,'oraria','ora','relazione')
        if w is not None: g[why].append(pnl(r,w))
    print(' '+nome); [print(f'   {k:34s}{st(v)}') for k,v in sorted(g.items())]
