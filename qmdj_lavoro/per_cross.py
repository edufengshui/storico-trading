# Lio per cross (25/11/2026, chiesto da Edu): tabella cross x forza nei due periodi e prova "in avanti":
# a ogni data la decisione (saltare / raddoppiare) usa SOLO i trade precedenti di quella casella.
import json
D=sorted([x for x in json.load(open('/tmp/dump.json')) if x.get('liv')=='LI' and x.get('liDir') and x.get('trend')],key=lambda x:x['date'])
for x in D:
    x['win']=1 if x['liDir']==x['real'] else 0;x['pip']=abs(x['move']) if x['win'] else -abs(x['move']);x['pe']=0 if x['date']<'2024-01-01' else 1
pc=lambda a,b:('%.1f%%'%(100*a/b)).replace('.',',') if b else '-'
cr=sorted(set(x['cross'] for x in D))
print('CROSS x FORZA: trade, vince, pip (2020-23 | 2024-26)')
for c in cr:
    for f in ('forte','media','debole'):
        s=[]
        for pe in (0,1):
            g=[x for x in D if x['cross']==c and x['liForza']==f and x['pe']==pe];s.append('%3d %6s %6d'%(len(g),pc(sum(x['win'] for x in g),len(g)),sum(x['pip'] for x in g)))
        print((c+' '+f).ljust(16),' | '.join(s))
def avanti(key,decide,label,minn=30,ult=None):
    H={};R={'base':[[0,0,0],[0,0,0]],'new':[[0,0,0],[0,0,0]],'salt':[[0,0,0],[0,0,0]],'dop':[[0,0,0],[0,0,0]]}
    for x in D:
        k=key(x);h=H.setdefault(k,[]);hh=h[-ult:] if ult else h;n=len(hh);w=sum(a for a,b in hh);p=sum(b for a,b in hh)
        m=decide(n,w,p) if n>=minn else 1
        pe=x['pe'];b=R['base'][pe];b[0]+=1;b[1]+=x['win'];b[2]+=x['pip']
        if m==0:
            s=R['salt'][pe];s[0]+=1;s[1]+=x['win'];s[2]+=x['pip']
        else:
            q=R['new'][pe];q[0]+=1;q[1]+=x['win'];q[2]+=x['pip']*m
            if m>1:
                d=R['dop'][pe];d[0]+=1;d[1]+=x['win'];d[2]+=x['pip']
        h.append((x['win'],x['pip']))
    print(label);
    for pe in (0,1):
        b,q,s,d=R['base'][pe],R['new'][pe],R['salt'][pe],R['dop'][pe]
        print('   periodo %d: base %d pip | con la regola %d pip | saltati %d (vincevano %s, %d pip) | raddoppiati %d (vincono %s, %d pip)'%(pe+1,b[2],q[2],s[0],pc(s[1],s[0]),s[2],d[0],pc(d[1],d[0]),d[2]))
kcf=lambda x:(x['cross'],x['liForza']);kc=lambda x:x['cross'];kcft=lambda x:(x['cross'],x['liForza'],x['liDir']==x['trend'])
print('\nPROVA IN AVANTI (decisione solo sul passato, almeno 30 trade nella casella)')
avanti(kcf,lambda n,w,p:0 if w/n<0.5 else 1,'Salta cross+forza se finora vince meno del 50%')
avanti(kcf,lambda n,w,p:0 if p<=0 else 1,'Salta cross+forza se finora e\' in perdita di pip')
avanti(kcf,lambda n,w,p:0 if w/n<0.55 else 1,'Salta cross+forza se finora vince meno del 55%')
avanti(kcf,lambda n,w,p:0 if w/n<0.5 else 1,'Salta cross+forza se negli ULTIMI 60 vince meno del 50%',ult=60)
avanti(kcft,lambda n,w,p:0 if w/n<0.5 else 1,'Salta cross+forza+col/contro trend se finora sotto il 50% (almeno 20)',minn=20)
avanti(kcf,lambda n,w,p:2 if w/n>=0.70 else 1,'Raddoppia cross+forza se finora vince almeno il 70%')
avanti(kcf,lambda n,w,p:2 if w/n>=0.75 else 1,'Raddoppia cross+forza se finora vince almeno il 75%')
avanti(kc,lambda n,w,p:2 if w/n>=0.68 else 1,'Raddoppia il CROSS intero se finora vince almeno il 68%',minn=60)
avanti(kc,lambda n,w,p:2 if w/n>=0.68 else 1,'Raddoppia il CROSS se negli ULTIMI 100 vince almeno il 68%',minn=60,ult=100)
avanti(kc,lambda n,w,p:0 if w/n<0.55 else 1,'Salta il CROSS se negli ULTIMI 40 vince meno del 55%',minn=40,ult=40)
avanti(kc,lambda n,w,p:0 if w/n<0.5 else 1,'Salta il CROSS se negli ULTIMI 20 vince meno del 50%',minn=20,ult=20)
# solo forti come confronto
print('\nConfronto: raddoppiare tutti i FORTI (senza guardare il cross)')
for pe in (0,1):
    g=[x for x in D if x['pe']==pe];print('   periodo %d: base %d pip | forti x2 %d pip'%(pe+1,sum(x['pip'] for x in g),sum(x['pip']*(2 if x['liForza']=='forte' else 1) for x in g)))
# AUDUSD anno per anno
print('\nAUDUSD anno per anno');
for y in range(2020,2027):
    g=[x for x in D if x['cross']=='AUDUSD' and x['date'][:4]==str(y)];print('  ',y,len(g),pc(sum(x['win'] for x in g),len(g)),sum(x['pip'] for x in g))
g=[x for x in D if x['cross']=='AUDUSD' and x['date']>='2026-06-01'];print('   da giugno 2026',len(g),pc(sum(x['win'] for x in g),len(g)),sum(x['pip'] for x in g))
