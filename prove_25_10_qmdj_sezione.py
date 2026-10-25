# Edu 25/10/2026 11:17: Dun = sezione della carta. Kan Gen Zhen Xun (1 8 3 4) da una parte, Li Kun Dui Qian (9 2 7 6) dall'altra
# (interni in yang dun i primi, in yin dun i secondi). Se DS e HS stanno nella stessa sezione chi controlla controlla sempre:
# il controllo rovesciato (controllato piu' forte) vale solo fra sezioni diverse.
exec(open('/home/claude/qm/misura11.py').read().split("for at in")[0])
SEZ={'1':0,'8':0,'3':0,'4':0,'9':1,'2':1,'7':1,'6':1}
_es=esito
def esito(r,carta,vsrc,stag):
    w,why=_es(r,carta,vsrc,stag)
    if w is not None and '(反侮)' in why:
        ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora']))
        if SEZ[a]==SEZ[b]:
            why=why.replace(' (反侮)',' (stessa sezione)'); w = why.startswith('giorno controlla')
    return w,why
if __name__=='__main__' or True:
  for at in (('Commander','Zhi Shi'),('Commander','Zhi Shi','Wu cielo'),('Commander','Zhi Shi','Wu cielo','Birth')):
    ATTORI=at; print(' + '.join(at).ljust(38),run())
  ATTORI=('Commander','Zhi Shi','Wu cielo')
  for c,d in (('USDCAD','2026-10-06'),('EURJPY','2024-12-19'),('EURJPY','2026-10-22'),('USDJPY','2024-11-06'),('USDJPY','2024-05-01')):
    r=[x for x in S+V if x['cross']==c and x['date']==d][0]; RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]})
    w,why=esito9(r,1,'ribalta'); _,_,p=esito6(r); print(c,d,'segue' if w else 'non segue','|',why,p,'| reale:', 'segue' if (r['move']>0)==(r['trend']=='LONG') else 'non segue')
