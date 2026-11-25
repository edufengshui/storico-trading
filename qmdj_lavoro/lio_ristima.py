# Edu 25/11/2026 ("Procedi"): ristimare le affidabilita' di Lio su anni recenti e provarle sul 2026 e sul vivo.
# Base: /tmp/dump.json (ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi>) + registro_live.json.
# Rifa' leggo_io.js: FAM, ROUTE, pesi ln(p/(1-p)), CAL per fascia di margine, PESO DLR 0,75, soglia 0,1, forza 0,3 / 0,6.
import json,math,re,sys
D=json.load(open('/tmp/dump.json'))
FAM={'LY':['LY','LETT','CM','D','LYF'],'PB':['PB','PBF'],'DLR':['DLR','DLRF']}
ROUTE={'LY':'lySez','LETT':'lettGrad','DLR':'dlrVia'}; CAT=['D','LYF','PBF','DLRF']
FASCE=[0,.15,.3,.5,.8,99]; SOGLIA=.1; PESO={'LY':1,'PB':1,'DLR':.75}
lo=lambda p: math.log(p/(1-p)); sh=lambda ok,n,p0,k:(ok+p0*k)/(n+k)
fascia=lambda m: next(i for i in range(5) if FASCE[i]<=m<FASCE[i+1])
def stima(dott,cat,cal):
    P={};PR={}
    for f in FAM:
        for v in FAM[f]:
            S=cat if v in CAT else dott; n=ok=0; r={}
            for x in S:
                if not x.get(v): continue
                n+=1; g=x[v]==x['real']; ok+=g
                if v in ROUTE:
                    k=x.get(ROUTE[v]) or '—'; a=r.setdefault(k,[0,0]); a[0]+=1; a[1]+=g
            P[v]=sh(ok,n,.5,50)
            if v in ROUTE: PR[v]={k:sh(a[1],a[0],P[v],30) for k,a in r.items()}
    par={'P':P,'PR':PR,'CAL':None}
    CAL={}
    for f in FAM:
        c=[[0,0] for _ in range(5)]
        for x in cal:
            s=fam(par,f,x)
            if not s: continue
            b=fascia(abs(s)); c[b][0]+=1; c[b][1]+=(s>0)==(x['real']=='LONG')
        CAL[f]=[sh(ok,n,.5,20) for n,ok in c]
    par['CAL']=CAL; return par
def pv(par,v,x):
    if v in ROUTE and par['PR'].get(v):
        k=x.get(ROUTE[v]) or '—'
        if k in par['PR'][v]: return par['PR'][v][k]
    return par['P'][v]
def fam(par,f,x):
    s=0
    for v in FAM[f]:
        d=x.get(v)
        if d not in('LONG','SHORT'): continue
        p=pv(par,v,x); w=lo(p) if p>.5 else 0; s+= w if d=='LONG' else -w
    return s
def leggi(par,x):
    z=0
    for f in FAM:
        s=fam(par,f,x)
        if not s: continue
        pf=par['CAL'][f][fascia(abs(s))]
        if pf>.5: z+=(lo(pf) if s>0 else -lo(pf))*PESO[f]
    m=abs(z)
    if m<=SOGLIA: return None,None,m
    return ('LONG' if z>0 else 'SHORT'),('forte' if m>=.6 else 'media' if m>=.3 else 'debole'),m
def misura(par,S,nome):
    G={}
    for x in S:
        d,f,m=leggi(par,x)
        if not d: continue
        w=d==x['real']; p=abs(x['move']) if w else -abs(x['move'])
        for k in('tutti',f):
            g=G.setdefault(k,[0,0,0]); g[0]+=1; g[1]+=w; g[2]+=p
    return nome+': '+' | '.join('%s %d %.1f%% %+d'%(k,G[k][0],100*G[k][1]/G[k][0],G[k][2]) for k in('tutti','forte','media','debole') if k in G)
att=json.load(open('/home/claude/lavoro/lio_param_attuali.json')); att['PR']={k:v for k,v in att['PR'].items() if v}
# controllo: i parametri attuali rifanno il Lio del dump?
ok=tot=0
for x in D:
    d,f,m=leggi(att,x)
    if x.get('liDir') or d: tot+=1; ok+= (d==x.get('liDir') and f==x.get('liForza'))
print('controllo: Lio rifatto uguale al dump su %d di %d'%(ok,tot))
Y=lambda a,b:[x for x in D if a<=x['date']<b]
# vivo: le voci dal racconto del registro
NOMI={'Liu Yao':'LY','lettura della carta':'LETT','colpo del mese':'CM','sistema D':'D','LY per forma':'LYF','Plum Blossom':'PB','PB per forma':'PBF','Da Liu Ren':'DLR','DLR per forma':'DLRF'}
V=[]
reg=json.load(open('registro_live.json'))
for d in sorted(reg):
    for t in reg[d]:
        if t.get('esito') is None or 'LEGGO IO:' not in (t.get('voci') or ''): continue
        txt=t['voci'].split('LEGGO IO:')[1].split('Conclusione:')[0]; x={'date':d,'cross':t['cross']}
        for nome,k in NOMI.items():
            m=re.search(r'(?:: |, )'+re.escape(nome)+r' (LONG|SHORT)(?: \(([^)]*)\))? \d+%',txt)
            if m:
                x[k]=m.group(1)
                if k in ROUTE: x[ROUTE[k]]=m.group(2)
        if t.get('livello')!='LI' or t.get('signal') not in('LONG','SHORT'): continue
        x['real']=t['signal'] if t['esito']>0 else ('SHORT' if t['signal']=='LONG' else 'LONG'); x['move']=abs(t['esito']); x['lio']=t['signal']; x['forza']=t.get('forza'); V.append(x)
okv=sum(1 for x in V if leggi(att,x)[0]==x['lio'] and leggi(att,x)[1]==x['forza'])
print('controllo vivo: Lio rifatto uguale al registro su %d di %d'%(okv,len(V)))
VAR={'attuali (stimate sul 2020-23)':att,
 'A: dottrina 2020-25, forma 2022-25, taratura 2024-25':stima(Y('2020','2026'),Y('2022','2026'),Y('2024','2026')),
 'B: tutto 2022-25, taratura 2024-25':stima(Y('2022','2026'),Y('2022','2026'),Y('2024','2026')),
 'C: tutto 2023-25, taratura 2024-25':stima(Y('2023','2026'),Y('2023','2026'),Y('2024','2026')),
 'D: dottrina 2020-25, forma 2022-25, taratura 2022-25':stima(Y('2020','2026'),Y('2022','2026'),Y('2022','2026'))}
T26=Y('2026','2027')
for n,p in VAR.items():
    print('\n'+n); print('  CAL',{f:[round(v,2) for v in p['CAL'][f]] for f in FAM})
    print('  '+misura(p,T26,'2026 (mai visto)')); print('  '+misura(p,V,'dal vivo'))
json.dump({k:v for k,v in VAR.items()},open('/home/claude/lavoro/lio_varianti.json','w'))

# --- CONTROLLO DEL 25/11: le voci "per forma" (D, LYF, PBF, DLRF) hanno i cataloghi costruiti su tutto lo storico fino al 18/09/2026:
# dentro lo storico azzeccano il 64-72% in OGNI anno (2026 compreso), quindi il "2026 mai visto" delle varianti A-D e' gonfiato.
# Prova pulita: solo dopo il 18/09/2026 (dump 19/09-16/10) e dal vivo; variante E = ristima SOLO le voci di dottrina.
print('\n=== voci dopo il 18/09/2026 (dump) e dal vivo (tutte le righe del registro con esito) ===')
POST=[x for x in D if x['date']>'2026-09-18']
VV=[]
for d in sorted(reg):
    for t in reg[d]:
        if t.get('esito') is None or 'LEGGO IO:' not in (t.get('voci') or '') or t.get('signal') not in('LONG','SHORT'): continue
        txt=t['voci'].split('LEGGO IO:')[1].split('Conclusione:')[0]; x={'date':d}
        for nome,k in NOMI.items():
            m=re.search(r'(?:: |, )'+re.escape(nome)+r' (LONG|SHORT)(?: \(([^)]*)\))? \d+%',txt)
            if m: x[k]=m.group(1)
        x['real']=t['signal'] if t['esito']>0 else ('SHORT' if t['signal']=='LONG' else 'LONG'); VV.append(x)
for v in ['LY','LETT','D','LYF','PB','PBF','DLR','DLRF']:
    a=[x for x in POST if x.get(v)]; b=[x for x in VV if x.get(v)]
    print('  %-5s dump 19/09-16/10: %s | vivo: %s'%(v,'%.1f%% su %d'%(100*sum(x[v]==x['real'] for x in a)/len(a),len(a)) if a else '-','%.1f%% su %d'%(100*sum(x[v]==x['real'] for x in b)/len(b),len(b)) if b else '-'))
def stimaE(dott,cal):
    p=stima(dott,dott,cal)
    for v in CAT: p['P'][v]=att['P'][v]
    CAL={}
    for f in FAM:
        c=[[0,0] for _ in range(5)]
        for x in cal:
            s=fam(p,f,x)
            if not s: continue
            b=fascia(abs(s)); c[b][0]+=1; c[b][1]+=(s>0)==(x['real']=='LONG')
        CAL[f]=[sh(ok,n,.5,20) for n,ok in c]
    p['CAL']=CAL; return p
VAR2={'attuali':att,'A (gonfiata)':VAR['A: dottrina 2020-25, forma 2022-25, taratura 2024-25'],
 'E1: solo dottrina 2020-25, forma come oggi, taratura 2024-25':stimaE(Y('2020','2026'),Y('2024','2026')),
 'E2: solo dottrina 2022-25, forma come oggi, taratura 2024-25':stimaE(Y('2022','2026'),Y('2024','2026'))}
E3=stimaE(Y('2020','2026'),Y('2024','2026')); E3['CAL']=att['CAL']; VAR2['E3: solo dottrina 2020-25, forma e taratura come oggi']=E3
for n,p in VAR2.items():
    print('\n'+n); print('  CAL',{f:[round(v,2) for v in p['CAL'][f]] for f in FAM})
    print('  '+misura(p,T26,'2026')); print('  '+misura(p,POST,'dump 19/09-16/10')); print('  '+misura(p,V,'dal vivo'))

# --- PESO DEI METODI (regola di Edu del 22/10/2026: "abbassa di un quarto fino a che non vediamo che riprende"): dal vivo PB 45% e DLR 47%.
print('\n=== peso dei metodi, parametri attuali ===')
def metodo_solo(S,f):
    n=ok=0
    for x in S:
        s=fam(att,f,x)
        if not s: continue
        n+=1; ok+=(s>0)==(x['real']=='LONG')
    return '%.1f%% su %d'%(100*ok/n,n) if n else '-'
for f in FAM: print('  metodo %s da solo: 2024-25 %s | 2026 %s | dump 19/09-16/10 %s | vivo %s'%(f,metodo_solo(Y('2024','2026'),f),metodo_solo(T26,f),metodo_solo(POST,f),metodo_solo(V,f)))
for pesi in [(1,1,.75),(1,.75,.5),(1,.5,.5),(1,.5,.25),(1,1,.5),(1,.75,.75),(1,0,0)]:
    PESO['LY'],PESO['PB'],PESO['DLR']=pesi
    print('\n  pesi LY %s PB %s DLR %s'%pesi)
    for S,n in((Y('2024','2026'),'2024-25'),(T26,'2026'),(POST,'dump 19/09-16/10'),(V,'dal vivo')): print('    '+misura(att,S,n))
PESO['LY'],PESO['PB'],PESO['DLR']=1,1,.75
