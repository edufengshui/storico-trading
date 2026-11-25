# Bilancia: configurazioni di pesi scelte a mano, tutte provate sui due periodi.
import json,numpy as np
J=json.load(open('/tmp/feat.json'));fam=J['fam'];R=J['rows'];ix={n:i for i,n in enumerate(fam)}
P=[[r for r in R if r['d']<'2024-01-01'],[r for r in R if r['d']>='2024-01-01']]
pc=lambda a,b:('%.1f%%'%(100*a/b)).replace('.',',') if b else '-'
def score(r,c):
    w=c.get('fam',{});s=1+c.get('forte',1)*(r['forza']=='forte')+c.get('media',0)*(r['forza']=='media')-c.get('stor',1)*r['stor']
    for k,v in enumerate(r['f']):
        if v:s+=v*w.get(fam[k],c.get('altri',1))
    return s
V='View spinge in su';T='il controllo tiene';F='flusso del qi su View';Y='fan yin';Z='ZF vuoto del giorno'
C=[('tutti a 1',{}),('Lio forte 2',{'forte':2}),('Lio forte 3',{'forte':3}),('Lio forte 2, media 1',{'forte':2,'media':1}),
('View su 2',{'fam':{V:2}}),('controllo tiene 2',{'fam':{T:2}}),('flusso 0',{'fam':{F:0}}),('storico 0',{'stor':0}),('storico 2',{'stor':2}),
('View 2, tiene 2, fan yin 2, flusso 0',{'fam':{V:2,T:2,Y:2,F:0}}),
('come sopra + forte 2, media 1',{'forte':2,'media':1,'fam':{V:2,T:2,Y:2,F:0}}),
('solo le 5 che reggono (altre 0)',{'altri':0,'fam':{V:1,T:1,Y:1,Z:1,'base controlla':1}}),
('solo le 5 che reggono + forte 2, media 1',{'altri':0,'forte':2,'media':1,'fam':{V:1,T:1,Y:1,Z:1,'base controlla':1}}),
('QMDJ tutto a 0 (solo Lio e storico)',{'altri':0})]
print('configurazione'.ljust(42),'contro Lio (<0) | pari (0) | per Lio (>0)   -- 2020-23 || 2024-26')
for n,c in C:
    o=[]
    for p in P:
        s=np.array([score(r,c) for r in p]);g=[]
        for m in (s<0,s==0,s>0):
            k=np.where(m)[0];g.append('%4d %6s %6d'%(len(k),pc(sum(p[i]['win'] for i in k),len(k)),sum(p[i]['pip'] for i in k)))
        o.append(' | '.join(g))
    print(n.ljust(42),' || '.join(o))
