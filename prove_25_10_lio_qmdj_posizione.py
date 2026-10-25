# Misura della posizione (Edu 25/10/2026): attuale = piena sulle forti, meta' su medie e deboli.
# Proposta: QMDJ confermato d'accordo con Lio -> piena anche su medie (e deboli: variante); QMDJ confermato contrario -> meta' anche sulle forti.
exec(open('/home/claude/qm/lio_qmdj.py').read().split("riga('Leggo io")[0])
def att(r): return 1.0 if r['forza']=='forte' else 0.5
def prop(r, deboli=False):
    s=att(r)
    if r['conf'] and r['q']:
        if r['q']==r['lio']:
            if r['forza']=='media' or (deboli and r['forza']=='debole'): s=1.0
        else: s=0.5
    return s
def pip(f):
    return ' | '.join(f'{p}: '+f'{sum(f(r)*pn(r,r["lio"]) for r in R if r["lio"] and per(r["date"])==p):+8.0f} pip (pos. {sum(f(r) for r in R if r["lio"] and per(r["date"])==p):6.0f})' for p in P)
print('attuale (forte 1, media/debole 1/2)'.ljust(52),pip(att))
print('proposta (accordo: media 1; contrario: 1/2)'.ljust(52),pip(prop))
print('proposta + accordo anche debole 1'.ljust(52),pip(lambda r:prop(r,True)))
print('solo contrario -> 1/2 (accordo invariato)'.ljust(52),pip(lambda r: 0.5 if (r['conf'] and r['q'] and r['q']!=r['lio']) else att(r)))
print('solo accordo -> media 1 (contrario invariato)'.ljust(52),pip(lambda r: 1.0 if (r['conf'] and r['q']==r['lio'] and r['forza']=='media') else att(r)))
# resa per unita' di posizione
def resa(f): return ' | '.join(f"{p}: {sum(f(r)*pn(r,r['lio']) for r in R if r['lio'] and per(r['date'])==p)/max(1,sum(f(r) for r in R if r['lio'] and per(r['date'])==p)):5.1f} pip/pos" for p in P)
print('\nresa per posizione piena: attuale',resa(att)); print('                            proposta',resa(prop))
