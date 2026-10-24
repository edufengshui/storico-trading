# Edu 24/10/2026 18:26 (USDJPY 01/05/2024): "DS e' vuoto quindi non puo' essere generato; il Commander e' pure contro (opposto a Dui)".
# 1) generazione verso un palazzo vuoto: non avviene -> vince chi genera.  2) Commander nel palazzo opposto: contro quel palazzo.
exec(open('/home/claude/qm/misura6.py').read().split("for n,sel")[0])
OPP={'1':'9','9':'1','2':'8','8':'2','3':'7','7':'3','4':'6','6':'4'}
def esito9(r,vg,cm):
    w,why,p=esito6(r)
    if w is None: return None,why
    ch=r['po']; a,b=pal(ch,stem_of(r['giorno'])),pal(ch,stem_of(r['ora'])); vu=vuoti(r['ora'])
    if vg and 'genera' in why:
        gen = b if why=='giorno genera ora' else a
        if vuoto(gen,ch,vu): w = not w; why+=' (generato vuoto)'
    if cm:
        c=cmd(ch); vinc=a if w else b; perd=b if w else a
        if c and OPP.get(c)==vinc:
            if cm=='ribalta': w=not w
            elif cm=='fermo': w=None
            why+=' · Commander opposto al vincitore'
    return w,why
for vg,cm in ((0,None),(1,None),(1,'ribalta'),(1,'fermo'),(0,'ribalta')):
    nm=('generato vuoto ' if vg else '')+('Commander opposto: '+cm if cm else '')
    print((nm or 'regola attuale').ljust(44),'  '.join(f'{n}: '+st([pnl(r,w) for r in sel for w,_ in [esito9(r,vg,cm)] if w is not None]) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
from collections import defaultdict
print('\nSolo le carte toccate:')
for lab,f in (('generato vuoto',lambda why:'generato vuoto' in why),('Commander opposto al vincitore',lambda why:'Commander opposto' in why)):
    print(' ',lab,'  '.join(f'{n}: '+st([pnl(r,w) for r in sel for w,why in [esito9(r,1,'ribalta')] if w is not None and f(why)]) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
r=[x for x in TE if x['cross']=='USDJPY' and x['date']=='2024-05-01'][0]; print(esito9(r,1,'ribalta'))
