# RIFERIMENTO SOFTWARE LIU YAO (YijingWWG) — dottrina di base

Estratto dal software HTML di Edu (calcolatore di esagrammi Yijing) il 12/08/2026.
Serve come **verità di riferimento** per verificare il motore `pb_stress.js`.

**Stato della verifica (12/08/2026):** il motore concorda con questo software su
TUTTI i punti sotto — 0 differenze su 64 esagrammi per i palazzi, Na Jia identica,
combinazioni/clash identici, 伏神 identici sui casi campione (Sheng 46, Shi He 21).

---

## 1. Codici dei rami (branch codes del software → carattere → elemento)

| codice | ramo | elemento |
|---|---|---|
| z  | 子 | Water |
| c  | 丑 | Earth |
| y  | 寅 | Wood |
| m  | 卯 | Wood |
| cn | 辰 | Earth |
| si | 巳 | Fire |
| w  | 午 | Fire |
| we | 未 | Earth |
| s  | 申 | Metal |
| yo | 酉 | Metal |
| xu | 戌 | Earth |
| h  | 亥 | Water |

Elementi del software: WATER=0, WOOD=1, FIRE=2, EARTH=3, METAL=4.

## 2. Parenti (5 relations)

Distanza = elemento_linea − elemento_palazzo (mod 5):
- 0 → **B** (Brother, 兄弟) — stesso elemento del palazzo
- 1 → **C** (Children, 子孫) — il palazzo genera
- 2 → **W** (Wealth, 妻財) — il palazzo controlla
- 3 → **G** (Officer, 官鬼) — controlla il palazzo
- 4 → **P** (Parent, 父母) — genera il palazzo

## 3. Na Jia — rami sulle 6 linee (L1..L6 dal basso), per gli 8 trigrammi puri

| trigramma | elemento | L1 L2 L3 L4 L5 L6 |
|---|---|---|
| 乾 Qian | Metal | 子 寅 辰 午 申 戌 |
| 兌 Dui  | Metal | 巳 卯 丑 亥 酉 未 |
| 離 Li   | Fire  | 卯 丑 亥 酉 未 巳 |
| 震 Zhen | Wood  | 子 寅 辰 午 申 戌 |
| 巽 Xun  | Wood  | 丑 亥 酉 未 巳 卯 |
| 坎 Kan  | Water | 寅 辰 午 申 戌 子 |
| 艮 Gen  | Earth | 辰 午 申 戌 子 寅 |
| 坤 Kun  | Earth | 未 巳 卯 丑 亥 酉 |

(Qian e Zhen condividono la stessa Na Jia; per un esagramma si prendono L1-L3 dal
trigramma inferiore e L4-L6 dal superiore.)

## 4. Palazzo di Jing Fang (get_palace)

Elementi degli 8 palazzi: Qian=Metal, Dui=Metal, Li=Fire, Zhen=Wood, Xun=Wood,
Kan=Water, Gen=Earth, Kun=Earth.

Algoritmo:
1. Calcola i "changes" = confronto bit per bit fra trigramma inferiore (bit 0-2) e
   superiore (bit 3-5). Ogni posizione: 'C' se diversi, ' ' se uguali.
2. La stringa di 3 changes dà la linea Shi (世):
   - `   ` (nessun change) → Shi = 6 (esagramma puro)
   - `C  ` → Shi = 1 · `CC ` → Shi = 2 · `CCC` → Shi = 3
   - `  C` → Shi = 5 · ` CC` → Shi = 4
   - `C C` → Shi = 4, **游魂 (wandering gua)**
   - ` C ` → Shi = 3, **歸魂 (returning gua)**
3. Il palazzo (i suoi bit inferiori) si legge così:
   - Shi = 1, 2, o (3 e NON returning) → bit del trigramma **superiore** (3-6)
   - Shi = 4 o 5 → **reverse** dei bit del trigramma **inferiore** (0-3)
   - Shi = 6, o (3 e returning) → bit del trigramma **inferiore** (0-3)
4. Ying (應) = Shi − 3 (se ≤0, +6).

Verificato: Shi He 21 (100101) → changes `  C` → Shi linea 5 → palazzo Xun (Wood).

## 5. Vuoti (旬空) — get_void_branches

Dati stelo e ramo del giorno: si trova la distanza dal prossimo 甲 (Jia), e i due
rami vuoti sono quelli che restano fuori dal ciclo di 10. Regola standard 旬空.

## 6. Combinazioni (六合) e Clash (六冲)

**COMBINAZIONI (六合):**
子↔丑 · 寅↔亥 · 卯↔戌 · 辰↔酉 · 巳↔申 · 午↔未

**CLASH (六冲):**
子↔午 · 丑↔未 · 寅↔申 · 卯↔酉 · 辰↔戌 · 巳↔亥

## 7. 伏神 (spiriti nascosti / hidden)

Se un elemento (fra i 5) è **assente** dalle 6 linee dell'esagramma di lavoro, si va
all'esagramma **puro del palazzo** e si prende, alla stessa posizione dove quel
elemento compare, il ramo corrispondente: quello si mette NASCOSTO dietro quella
linea. Il parente del nascosto si calcola sull'elemento del palazzo.

Verificato: Sheng 46 (palazzo Zhen/Wood) → mancano Wood e Fire →
nascosti 寅 (Wood, Brother) alla linea 2 e 午 (Fire, Children) alla linea 4.

## 8. 6 Combinazione / 6 Clash dell'esagramma

Si guarda se il ramo della linea 1 (inferiore) combina o clasha col ramo della
linea 4 (superiore): se combinano → "6 Combination", se clashano → "6 Clash".

## 9. Sei Bestie (colori) — dallo stelo del giorno

Ordine: qing long (青龍) → zhu que (朱雀) → gou chen (勾陳) → teng she (螣蛇) →
bai hu (白虎) → xuan wu (玄武), assegnate alle 6 linee dal basso, partendo dal
colore dello stelo del giorno:
- 甲/乙 (Jia/Yi) → parte da qing long
- 丙/丁 (Bing/Ding) → zhu que
- 戊 (Wu) → gou chen
- 己 (Ji) → teng she
- 庚/辛 (Geng/Xin) → bai hu
- 壬/癸 (Ren/Gui) → xuan wu

---

## Note operative

- Il software di Edu è la fonte autoritativa per la dottrina di base (struttura,
  Na Jia, palazzi, parenti, nascosti, combinazioni). Le regole DINAMICHE (forza
  stagionale, movimento della mutante, Tai Sui, ecc.) sono dottrina di Edu aggiunta
  sopra questa base — vanno sempre confermate da Edu, non dedotte.
- Per verificare una carta: confrontare l'output del motore riga per riga con lo
  screenshot del software; segnalare SOLO le differenze, senza reinterpretare.
