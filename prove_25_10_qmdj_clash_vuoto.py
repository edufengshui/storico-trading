# Edu 25/10/2026 12:43 (USDJPY 19/10, Li 癸/丁): "un clash interno ad un palazzo lo fa uscire dal vuoto".
# Clash interno = steli (甲庚 乙辛 丙壬 丁癸) o rami dei 六仪 (戊/辛 庚/癸 壬/己), come definito da Edu il 24/10.
exec(open('/home/claude/qm/misura14.py').read().split("for m,nm")[0])
MODO=1
CL={'甲':'庚','庚':'甲','乙':'辛','辛':'乙','丙':'壬','壬':'丙','丁':'癸','癸':'丁'}
YI={'戊':'子','己':'戌','庚':'申','辛':'午','壬':'辰','癸':'寅'}
CHB={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'}
def clash(ch,p):
    t,e=ch[p]['t'],ch[p]['e']
    return CL.get(t)==e or (t in YI and e in YI and CHB[YI[t]]==YI[e])
CLV=0
_v2=vuoto
def vuoto(p,ch,vu):
    if CLV and clash(ch,p): return False
    return _v2(p,ch,vu)
for m,nm in ((0,'attuale'),(1,'clash interno toglie il vuoto')):
    CLV=m; print(nm.ljust(32),run())
CLV=1
r=[x for x in V if x['cross']=='USDJPY' and x['date']=='2026-10-19'][0]; RIEMPI.clear(); RIEMPI.update({r['mese'][1],r['giorno'][1]})
print(esito6(r), esito9(r,1,'ribalta'))
