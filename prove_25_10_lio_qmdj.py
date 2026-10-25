import json, math
R=json.load(open('/home/claude/qm/lio_qmdj.json'))
SP=1.5
def per(d): return '2020-23' if d<'2024' else ('2024-26' if d<'2026-09-29' else 'vivo')
def pn(r,d): return (r['move'] if d=='LONG' else -r['move'])-SP
def st(x):
    n=len(x)
    if not n: return '      -'
    w=sum(1 for v in x if v>0); return f'{n:5d} {100*w/n:5.1f}% {sum(x):+7.0f}'
P=('2020-23','2024-26','vivo')
def riga(nome,f):
    print(nome.ljust(44),' | '.join(f'{p}: '+st([v for r in R if per(r['date'])==p for v in [f(r)] if v is not None]) for p in P))
riga('Leggo io da solo', lambda r: pn(r,r['lio']) if r['lio'] else None)
riga('QMDJ da solo', lambda r: pn(r,r['q']) if r['q'] else None)
riga('QMDJ confermato da solo', lambda r: pn(r,r['q']) if r['q'] and r['conf'] else None)
print()
riga('Lio quando QMDJ concorda', lambda r: pn(r,r['lio']) if r['lio'] and r['q']==r['lio'] else None)
riga('Lio quando QMDJ e\' contrario', lambda r: pn(r,r['lio']) if r['lio'] and r['q'] and r['q']!=r['lio'] else None)
riga('Lio quando QMDJ tace', lambda r: pn(r,r['lio']) if r['lio'] and not r['q'] else None)
riga('Lio quando QMDJ confermato concorda', lambda r: pn(r,r['lio']) if r['lio'] and r['conf'] and r['q']==r['lio'] else None)
riga('Lio quando QMDJ confermato e\' contrario', lambda r: pn(r,r['lio']) if r['lio'] and r['conf'] and r['q']!=r['lio'] else None)
print()
riga('A: Lio, fermo se QMDJ confermato contrario', lambda r: pn(r,r['lio']) if r['lio'] and not (r['conf'] and r['q']!=r['lio']) else None)
riga('B: A + QMDJ confermato dove Lio e\' fermo', lambda r: pn(r,r['lio']) if r['lio'] and not (r['conf'] and r['q']!=r['lio']) else (pn(r,r['q']) if not r['lio'] and r['conf'] else None))
riga('Lio + QMDJ confermato dove Lio e\' fermo', lambda r: pn(r,r['lio']) if r['lio'] else (pn(r,r['q']) if r['conf'] else None))
for fz in ('forte','media','debole'):
    riga(f'  Lio {fz}: QMDJ concorda', lambda r,fz=fz: pn(r,r['lio']) if r['lio'] and r['forza']==fz and r['q']==r['lio'] else None)
    riga(f'  Lio {fz}: QMDJ contrario', lambda r,fz=fz: pn(r,r['lio']) if r['lio'] and r['forza']==fz and r['q'] and r['q']!=r['lio'] else None)
