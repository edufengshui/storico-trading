# S78 (26/11/2026): Edu vuole la carta con tutti i commenti insieme in una sola immagine.
# Uso: python3 carta_png.py pagina/index.html N uscita.png  (N = 1 la carta in cima alla pagina "Carte dove Lio sbaglia")
import sys,re,subprocess,os
src,n,out=sys.argv[1],int(sys.argv[2]),sys.argv[3]
s=open(src,encoding='utf8').read()
head=s[:s.find('<main>')]
secs=[m.start() for m in re.finditer(r'<section class="card">',s)]
a=secs[n-1]; b=s.find('</section>',a)+len('</section>')
html=head+'<main style="max-width:520px;margin:0 auto;padding:10px">'+s[a:b]+'</main></body></html>'
tmp=out[:-4]+'_tutta.html'; open(tmp,'w',encoding='utf8').write(html)
for h in (2600,):
    subprocess.run(['google-chrome','--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=2','--window-size=540,%d'%h,'--screenshot='+out,'file://'+os.path.abspath(tmp)],capture_output=True)
from PIL import Image, ImageChops
im=Image.open(out).convert('RGB'); bg=Image.new('RGB',im.size,im.getpixel((2,im.size[1]-2))); bb=ImageChops.difference(im,bg).getbbox()
if bb: im=im.crop((0,0,im.size[0],min(im.size[1],bb[3]+30)))
im.save(out); print(im.size)
