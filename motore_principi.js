/*
 * MOTORE A PRINCIPI — v1 (sessione 27, 28/08/2026)
 * ============================================================================
 * Idea di Edu: "Basta fare dei collegamenti logici." Invece di una ricetta per
 * ogni carta guida, una catena di ragionamento che collega i PRINCIPI ATOMICI
 * gia' certificati. Le carte guida diventano i TEST del ragionamento.
 *
 * v1 copre la SPINA DORSALE DEL MOVIMENTO (lettura a inventario):
 *   1. C'e' una mobile: il suo passo si conclude?
 *      - arrivo vuoto (旬空) e non vibrante -> non si conclude   [dottrina vuoto]
 *      - il giorno combina/clasha partenza o arrivo -> sospesa   [salvo giorno legato dal mese]
 *      - tomba del mese sull'arrivo + penalita' (刑) dal giorno  [guida USDJPY 23/07/2024]
 *   2. Se il passo NON si conclude, il PERCHE' comanda:
 *      - PARTENZA impigliata + carattere malus (B/P): resta seduto e fa perdere
 *        la propria squadra                                       [§115]
 *      - ARRIVO impigliato + B: l'azione non si compie, il malus non colpisce,
 *        la sua sede vince                                        [§94]
 *      - tomba+penalita': la mobile esce dalla decisione -> duello Shi/Ying,
 *        la linea VUOTA e' dormiente e non agisce, vince l'altra  [§122]
 *   3. Se il passo SI conclude, parla il CARATTERE (G e W per primi):
 *      - la mobile diventa il suo arrivo ["l'arrivo agisce, non la partenza"]
 *      - arrivo G o W -> la squadra della mobile VINCE la sede
 *      - carattere malus (B/P) in cammino:
 *          avanza (進神)   -> la propria squadra PERDE            [dottrina 28/08]
 *          retrocede (退神) -> la propria squadra VINCE            [§120]
 *      - altrimenti l'ATTERRAGGIO: l'arrivo combina (六合) una ferma unica ->
 *        la sede raggiunta vince ["si guarda dove va il corridore"]
 *   4. Nessuna decisione dalla mobile (o nessuna mobile utile):
 *      duello Shi/Ying col principio del vuoto (la vuota dorme). Se muto, TACE.
 *
 * Il motore NON conosce le ricette: solo i principi e il loro ordine logico.
 * Uso: PRINCIPI=1 node pb_stress.js  (blocco di confronto) oppure require().
 * ============================================================================
 */
'use strict';

function creaMotore(LYM) {
  const WX = { '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire',
               '午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water' };
  const GEN  = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' };
  const COMBINA = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯',
                    '辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
  const SEASON = {'寅':'Wood','卯':'Wood','辰':'Wood','巳':'Fire','午':'Fire','未':'Fire',
                  '申':'Metal','酉':'Metal','戌':'Metal','亥':'Water','子':'Water','丑':'Water'};

  const sede = pos => pos > 3 ? 'LONG' : 'SHORT';
  const opposto = d => d === 'LONG' ? 'SHORT' : 'LONG';

  function leggi(R) {
    // ---- inventario ----
    const mob = R.linee[R.mutante.pos - 1];
    const dep = R.mutante.ramoDep, arr = R.mutante.ramoArr;
    const D = R.dayBranch, Mo = R.monthBranch;
    const casо = R.mutante.casoMut;
    const nullo = !!R.mutante.movimentoNullo;
    const malus = p => p === 'B' || p === 'P';

    // ---- 2. il passo non si conclude: il PERCHE' comanda ----
    if (nullo) {
      // tomba+penalita' (caso -4): la mobile esce, duello Shi/Ying col vuoto
      if (casо === -4) return duelloShiYing(R, 'tomba+penalità');
      // sospensione dal giorno (caso -1): chi e' impigliato?
      if (casо === -1 && D) {
        const depImp = COMBINA[D] === dep;
        const arrImp = COMBINA[D] === arr;
        if (depImp && malus(mob.par))
          return { dir: sede(mob.pos) === 'LONG' ? 'SHORT' : 'LONG',
                   perche: 'partenza impigliata: il ' + mob.par + ' resta seduto e fa perdere la sua squadra' };
        if (arrImp && mob.par === 'B')
          return { dir: sede(mob.pos),
                   perche: 'arrivo impigliato: l\'azione del B non si compie, il malus non colpisce, la sua sede vince' };
      }
      // arrivo vuoto o altri nulli: la mobile non decide -> duello
      return duelloShiYing(R, R.mutante.motivoNullo || 'movimento nullo');
    }

    // ---- 3. il passo si conclude: parla il carattere ----
    // l'arrivo agisce, non la partenza: la mobile diventa il suo arrivo
    const parArr = R.mutante.parArr || mob.par;
    if (parArr === 'G' || parArr === 'W')
      return { dir: sede(mob.pos),
               perche: 'l\'arrivo è ' + parArr + ' (G e W parlano per primi): la squadra della mobile vince la sede' };

    // il malus in cammino: avanzare fa perdere, ritirarsi fa vincere
    if (malus(mob.par)) {
      if (R.mutante.progressione === 'avanzante')
        return { dir: opposto(sede(mob.pos)), perche: 'il ' + mob.par + ' avanza (進神): la sua squadra perde' };
      if (R.mutante.progressione === 'retrocedente')
        return { dir: sede(mob.pos), perche: 'il ' + mob.par + ' retrocede (退神): il malus si ritira, la sua squadra vince' };
    }

    // l'atterraggio: si guarda dove va il corridore
    const bersagli = R.linee.filter(l => l.pos !== mob.pos && !l.isMobile && COMBINA[arr] === l.ramo);
    if (bersagli.length === 1)
      return { dir: sede(bersagli[0].pos),
               perche: 'atterraggio: l\'arrivo ' + arr + ' combina L' + bersagli[0].pos + ' — la sede raggiunta vince' };

    // ---- 4. la mobile non decide ----
    return duelloShiYing(R, 'la mobile non porta una decisione');
  }

  function duelloShiYing(R, contesto) {
    const S = R.linee[R.shi - 1], Y = R.linee[R.ying - 1];
    const sv = R.vuoti.indexOf(S.ramo) >= 0, yv = R.vuoti.indexOf(Y.ramo) >= 0;
    if (sv !== yv) {
      const v = sv ? Y : S;
      return { dir: sede(v.pos),
               perche: contesto + ' → duello Shi/Ying: la ' + (sv ? 'Shi' : 'Ying') + ' è vuota e dorme, vince l\'altra' };
    }
    return { dir: null, perche: contesto + ' → duello Shi/Ying muto (vuoti pari): TACE' };
  }

  return { leggi };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { creaMotore };
