# Edu 24/10/2026 18:31 (USDJPY 06/11/2024): "Qian e' vuoto ma il mese e' Xu quindi il palazzo e' molto forte, il vuoto non e' significativo".
# Vuoto annullato se il palazzo contiene il ramo del mese (variante: anche quello del giorno).
src=open('/home/claude/qm/misura9.py').read().split("for vg,cm")[0]
exec(src)
_vuoto=vuoto
RIEMPI=set()
def vuoto(p,ch,vu):
    if vu and RIEMPI and set(PBR[p])&RIEMPI: return False   # il palazzo contiene il ramo del mese: il vuoto non conta
    return _vuoto(p,ch,vu)
def run(rami):
    out=[]
    for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V)):
        x=[]
        for r in sel:
            RIEMPI.clear(); RIEMPI.update(rami(r))
            w,_=esito9(r,1,'ribalta')
            if w is not None: x.append(pnl(r,w))
        out.append(f'{n}: '+st(x))
    RIEMPI.clear(); return '  '.join(out)
print('regola attuale'.ljust(26),run(lambda r:set()))
print('vuoto col ramo del mese'.ljust(26),run(lambda r:{r['mese'][1]}))
print('mese o giorno'.ljust(26),run(lambda r:{r['mese'][1],r['giorno'][1]}))
r=[x for x in TE if x['cross']=='USDJPY' and x['date']=='2024-11-06'][0]; RIEMPI.update({r['mese'][1]}); print(esito9(r,1,'ribalta'))
