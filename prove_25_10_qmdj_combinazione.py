# Edu 25/10/2026 11:53 (EURJPY 19/12/2024, Zhen 丁/壬): "il DS e' bloccato da una combinazione dentro il suo stesso palazzo".
# Combinazione = stelo del cielo e della terra in 五合 (甲己 乙庚 丙辛 丁壬 戊癸). I rami dei 六仪 non hanno 六合 fra loro.
exec(open('/home/claude/qm/misura11.py').read().split("for at in")[0])
_e6=esito6
def esito6(r):
    w,why,p=_e6(r)
    if p: w=('ora controlla giorno' in why)
    return w,why,p
ATTORI=('Commander','Zhi Shi','Wu cielo')
HE={'甲':'己','己':'甲','乙':'庚','庚':'乙','丙':'辛','辛':'丙','丁':'壬','壬':'丁','戊':'癸','癸':'戊'}
def comb(ch,p): return p is not None and HE.get(ch[p]['t'])==ch[p]['e']
MODO=0
_e9=esito9
def esito9(r,vg,cm):
    w,why=_e9(r,vg,cm)
    if not MODO: return w,why
    ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora']))
    ca,cb=comb(ch,a),comb(ch,b)
    if MODO==1:                      # palazzo bloccato non puo' vincere
        if ca and cb: return None,why+' · tutti e due bloccati'
        if ca: return False,why+' · DS bloccato'
        if cb: return True,why+' · HS bloccato'
    if MODO==2:                      # solo DS bloccato
        if ca: return False,why+' · DS bloccato'
    if MODO==3:                      # palazzo bloccato -> fermo
        if ca or cb: return None,why
    return w,why
for m,nm in ((0,'attuale (passamano)'),(1,'bloccato non vince (DS o HS)'),(2,'solo DS bloccato -> non segue'),(3,'bloccato -> fermo')):
    MODO=m; print(nm.ljust(34),run())
n=sum(1 for r in S if comb(r['po'],pal(r['po'],stem_of(r['giorno'])))); print('carte con DS bloccato:',n,'su',len(S))
MODO=1
for c,d in (('EURJPY','2024-12-19'),('EURJPY','2026-10-22'),('USDCAD','2026-10-06'),('USDJPY','2024-11-06'),('USDJPY','2024-05-01')):
    r=[x for x in S+V if x['cross']==c and x['date']==d][0]; RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]})
    w,why=esito9(r,1,'ribalta'); print(c,d,'segue' if w else ('non segue' if w is False else 'fermo'),'| reale:', 'segue' if (r['move']>0)==(r['trend']=='LONG') else 'non segue')
