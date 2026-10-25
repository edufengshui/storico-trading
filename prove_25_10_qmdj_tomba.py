# Edu 25/10/2026 12:59 (EURUSD 12/10, Li Fuoco nel mese 戌): "Li e' in tomba nel mese".
# Tomba (墓) dell'elemento del palazzo nel ramo del mese: Legno 未, Fuoco 戌, Metallo 丑, Acqua 辰, Terra 戌 (variante 辰).
exec(open('/home/claude/qm/misura17.py').read().split("for m,nm in ((0,'attuale'),(1,'fan")[0])
FY=1
TOMB={'L':'未','F':'戌','M':'丑','W':'辰','E':'戌'}
def tomba(p,mb): return TOMB.get(PEL[p])==mb
TM=0
_v3=vuoto
def vuoto(p,ch,vu):
    if TM==1 and CUR and tomba(p,CUR[0]): return True
    return _v3(p,ch,vu)
CUR=[]
_e9c=esito9
def esito9(r,vg,cm):
    CUR[:]=[r['mese'][1]]
    w,why=_e9c(r,vg,cm)
    if TM==2 and w is not None and not (FY and fanyin(r['po'])):
        ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora'])); mb=r['mese'][1]
        ta,tb=a and tomba(a,mb), b and tomba(b,mb)
        if ta and not tb: w=False
        elif tb and not ta: w=True
        elif ta and tb: w=None
    return w,why
for t,nm in ((0,'attuale'),(1,'tomba = come vuoto'),(2,'in tomba non vince')):
    TM=t; print(nm.ljust(24),run())
TOMB['E']='辰'
for t,nm in ((1,'tomba = vuoto (Terra 辰)'),(2,'non vince (Terra 辰)')):
    TM=t; print(nm.ljust(24),run())
TOMB['E']='戌'; TM=1
r=[x for x in V if x['cross']=='EURUSD' and x['date']=='2026-10-12'][0]; RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]}); print('EURUSD 12/10',esito9(r,1,'ribalta'))
