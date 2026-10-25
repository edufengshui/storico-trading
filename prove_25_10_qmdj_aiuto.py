# Edu 25/10/2026 11:32: un palazzo untimely fa fatica a controllare un palazzo molto timely e senza aiuti fallisce (controllo rovesciato);
# l'aiuto e' Zhi Fu (Commander) o Zhi Shi nel palazzo che genera chi controlla (es. Kan per Xun), non vuoto -> il controllo riesce.
exec(open('/home/claude/qm/misura11.py').read().split("for at in")[0])
_e6=esito6
def esito6(r):
    w,why,p=_e6(r)
    if p: w=False
    return w,why,p
ATTORI=('Commander','Zhi Shi','Wu cielo')
_es=esito
AIUTO=('Commander','Zhi Shi')
def esito(r,carta,vsrc,stag):
    w,why=_es(r,carta,vsrc,stag)
    if w is not None and '(反侮)' in why and AIUTO:
        ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora'])); vu=vuoti(r['ora'])
        ctrl=a if why.startswith('giorno controlla') else b
        hp=[p for n,p in (('Commander',cmd(ch)),('Zhi Shi',zs(ch))) if n in AIUTO and p and p not in (a,b) and not vuoto(p,ch,vu) and GEN[PEL[p]]==PEL[ctrl]]
        if hp: why=why.replace(' (反侮)',' (aiutato)'); w = (ctrl==a)
    return w,why
for aj in ((),('Commander',),('Zhi Shi',),('Commander','Zhi Shi')):
    AIUTO=aj; print(('aiuto: '+' + '.join(aj) if aj else 'senza aiuto (attuale)').ljust(34),run())
AIUTO=('Commander','Zhi Shi')
for c,d in (('USDCAD','2026-10-06'),('EURJPY','2024-12-19'),('EURJPY','2026-10-22'),('USDJPY','2024-11-06'),('USDJPY','2024-05-01')):
    r=[x for x in S+V if x['cross']==c and x['date']==d][0]; RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]})
    w,why=esito9(r,1,'ribalta'); print(c,d,'segue' if w else 'non segue','|',why,'| reale:', 'segue' if (r['move']>0)==(r['trend']=='LONG') else 'non segue')
