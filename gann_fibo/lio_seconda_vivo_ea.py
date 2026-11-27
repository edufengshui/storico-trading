# Seconda entrata sui trade di Lio DAL VIVO (storico_live.json, livello LI, dal 23/10/2026), barre orarie di orario_live.json.
import json, datetime as dt
from collections import defaultdict
DIR='./'; ST=json.load(open(DIR+'storico_live.json')); OR=json.load(open(DIR+'orario_live.json')); SP=1.5
days={}
for c in OR:
    by=defaultdict(list)
    for b in OR[c]: by[b['t'][:10]].append(b)
    G=[]
    for d in sorted(by):
        if dt.date.fromisoformat(d).weekday()>4: continue
        bb=sorted([b for b in by[d] if b['t'][11:13]<='21'],key=lambda b:b['t'])
        if not bb or bb[0]['t'][11:13]!='00' or bb[-1]['t'][11:13]!='21': continue
        pts=[(0,bb[0]['o'])]+[(int(b['t'][11:13])+1,b['c']) for b in bb]; v=[p for _,p in pts]; G.append((d,pts,max(v)-min(v)))
    for i in range(20,len(G)): days[c+G[i][0]]=(G[i][1],sum(G[j][2] for j in range(i-20,i))/20)
for X in (0.15,0.2,0.25,0.3):
    for sel,nm in (('fm','forti+medi'),('forte','forti'),('media','medi'),('debole','deboli')):
        n=w1=0;s1=0.0;n2=w2=0;s2=0.0;early=[0,0,0.0]
        for d in sorted(ST):
            if d<'2026-10-23': continue
            for t in ST[d]:
                if t.get('livello')!='LI' or t.get('cantina') or t.get('signal') not in('LONG','SHORT'): continue
                f=(t.get('forza') or 'forte')
                if (sel=='fm' and f=='debole') or (sel!='fm' and f!=sel): continue
                k=t['cross']+d
                if k not in days: continue
                pts,atr=days[k];P=100 if t['cross'].endswith('JPY') else 10000;s=1 if t['signal']=='LONG' else -1
                O=pts[0][1];C=pts[-1][1];p1=s*(C-O)*P-SP;n+=1;w1+=p1>0;s1+=p1
                j=next((j for j,(h,p) in enumerate(pts) if 2<=h<=7 and s*(p-O)<=-X*atr),None)
                if j is None: continue
                p2=s*(C-pts[j][1])*P-SP;n2+=1;w2+=p2>0;s2+=p2
                if pts[j][0]<=7: early[0]+=1;early[1]+=p2>0;early[2]+=p2
        print('X=%.1f %-7s prima entrata: %2d trade, %2d vinti, %+5.0f pip | seconda entrata: %2d, %2d vinti, %+5.0f pip | di cui entro le 07 GMT: %2d, %2d vinti, %+5.0f'%(X,nm,n,w1,s1,n2,w2,s2,early[0],early[1],early[2]))
