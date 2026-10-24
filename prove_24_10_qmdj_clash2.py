# Clash interni (Edu, 24/10/2026 18:15): fra i due steli (甲庚 乙辛 丙壬 丁癸) o fra i due rami dei 六仪:
# 戊=甲子 己=甲戌 庚=甲申 辛=甲午 壬=甲辰 癸=甲寅 -> 戊/辛 (子午), 庚/癸 (申寅), 壬/己 (辰戌).
exec(open('/home/claude/qm/misura7.py').read().split("NOMI=")[0])
YI={'戊':'子','己':'戌','庚':'申','辛':'午','壬':'辰','癸':'寅'}
CHB={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'}
TIPO='entrambi'
def clash(ch,p):
    t,e=ch[p]['t'],ch[p]['e']
    st_=CL.get(t)==e; br=t in YI and e in YI and CHB[YI[t]]==YI[e]
    return {'entrambi':st_ or br,'rami':br,'steli':st_}[TIPO]
for TIPO in ('steli','rami','entrambi'):
    print('== clash fra',TIPO)
    for m,nm in ((1,'niente ponte'),(2,'+ vincitore in clash: fermo'),(3,'+ vincitore in clash: ribalta')):
        print('  '+nm.ljust(30),'  '.join(f'{n}: '+st([pnl(r,w) for r in sel for w,_,_ in [esito7(r,m)] if w is not None]) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
TIPO='entrambi'
print('senza clash'.ljust(32),'  '.join(f'{n}: '+st([pnl(r,w) for r in sel for w,_,_ in [esito7(r,0)] if w is not None]) for n,sel in (('2020-23',TR),('2024-26',TE),('vivo',V))))
