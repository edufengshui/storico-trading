# Bilancia: pesi. Per ogni famiglia di indicazioni: quanto vince Lio quando l'indicazione e' per lui / contro di lui.
# Poi pesi stimati su un periodo e PROVATI sull'altro (mai giudicati sul periodo dove sono stati scelti).
import json,sys,numpy as np
J=json.load(open('/tmp/feat.json'));fam=J['fam'];R=J['rows']
P=[[r for r in R if r['d']<'2024-01-01'],[r for r in R if r['d']>='2024-01-01']]
pc=lambda a,b:('%.1f%%'%(100*a/b)).replace('.',',') if b else '-'
print('FAMIGLIA: per Lio (n, vince) | contro Lio (n, vince)  -- 2020-23 || 2024-26')
for k,name in enumerate(fam):
    s=[]
    for p in P:
        a=[r for r in p if r['f'][k]>0];b=[r for r in p if r['f'][k]<0]
        s.append('%4d %6s | %4d %6s'%(len(a),pc(sum(r['win'] for r in a),len(a)),len(b),pc(sum(r['win'] for r in b),len(b))))
    print(name.ljust(36),' || '.join(s))
def X(rows):
    return np.array([[1,r['forza']=='forte',r['forza']=='media',r['col'],r['stor']]+r['f'] for r in rows],float)
names=['(base)','Lio forte','Lio media','Lio col trend','storico negativo']+fam
def fit(rows,l2=5.0):
    x=X(rows);y=np.array([r['win'] for r in rows],float);w=np.zeros(x.shape[1])
    for _ in range(4000):
        p=1/(1+np.exp(-x@w));g=x.T@(p-y)+l2*np.r_[0,w[1:]];w-=0.0005*g
    return w
def prova(w,rows,label):
    s=X(rows)@w;o=np.argsort(s);n=len(rows);out=[]
    for a,b,t in [(0,.1,'10% peggiore'),(.1,.3,'dal 10 al 30%'),(.3,.7,'centro'),(.7,1,'30% migliore')]:
        ix=o[int(a*n):int(b*n)];out.append('%s: %d trade, %s, %d pip'%(t,len(ix),pc(sum(rows[i]['win'] for i in ix),len(ix)),sum(rows[i]['pip'] for i in ix)))
    print(label);[print('   ',z) for z in out]
def unit(rows):
    return np.array([1+(r['forza']=='forte')+sum(r['f'])-r['stor'] for r in rows],float)
W=[fit(P[0]),fit(P[1])]
print('\nPESI stimati (2020-23 | 2024-26): stesso segno nei due periodi = regge')
for i,nm in enumerate(names):print(nm.ljust(36),'%6.2f | %6.2f'%(W[0][i],W[1][i]),'  REGGE' if W[0][i]*W[1][i]>0 and min(abs(W[0][i]),abs(W[1][i]))>=0.08 else '')
prova(W[0],P[1],'\nPesi scelti sul 2020-23, PROVATI sul 2024-26:')
prova(W[1],P[0],'Pesi scelti sul 2024-26, PROVATI sul 2020-23:')
for i,p in enumerate(P):
    s=unit(p);o=np.argsort(s,kind='stable');n=len(p);ix=o[:int(.1*n)];jx=o[int(.7*n):]
    print('Pesi tutti a 1, periodo %d: 10%% peggiore %s %d pip | 30%% migliore %s %d pip'%(i+1,pc(sum(p[k]['win'] for k in ix),len(ix)),sum(p[k]['pip'] for k in ix),pc(sum(p[k]['win'] for k in jx),len(jx)),sum(p[k]['pip'] for k in jx)))
# senza il QMDJ: solo Lio (forza, col trend, storico)
def fitsub(rows,cols):
    x=X(rows)[:,cols];y=np.array([r['win'] for r in rows],float);w=np.zeros(len(cols))
    for _ in range(4000):
        p=1/(1+np.exp(-x@w));w-=0.0005*(x.T@(p-y)+5*np.r_[0,w[1:]])
    return w
c=[0,1,2,3,4]
for a,b in [(0,1),(1,0)]:
    w=fitsub(P[a],c);s=X(P[b])[:,c]@w;o=np.argsort(s,kind='stable');n=len(P[b]);ix=o[:int(.1*n)]
    print('SENZA QMDJ (solo forza di Lio, col/contro trend, storico), provato sul periodo %d: 10%% peggiore %s %d pip'%(b+1,pc(sum(P[b][k]['win'] for k in ix),len(ix)),sum(P[b][k]['pip'] for k in ix)))
