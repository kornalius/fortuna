import random from 'lodash/random'
import anime from 'animejs'
import Entity from '../entity'
import { store } from '@/store'
import { emit, log, delay, mixin, registerClass } from '@/utils'
import Requirements from '@/mixins/requirements'
import { multiplier as multiplierParticles } from '@/particles'

export default class Combat extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      processing: false,
      npcId: null,
      // current turn
      turn: 1,
      // current turn bonus to apply
      bonus: {},
      // rolls left for the turn
      rolls: store.player.maxRolls,
      // has the combat ended
      ended: false,
      // did you win the battle?
      won: false,
      // selected dice
      selected: [],
      // done action dice
      done: [],
      // combos
      combos: [
        {
          faces: { 'A': 3 },
          valueLabel: matches => (
            `+${Math.max(0, (matches['A'] || 0) - 2)}`
          ),
          expr: async matches => {
            this.bonus['A'] = matches['A'] - 2
          },
        },
        {
          faces: { 'A': 5 },
          valueLabel: () => (
            'x2'
          ),
          expr: async () => {
            this.multipliers['A'] = 2
          },
        },
        {
          faces: { 'D': 3 },
          valueLabel: matches => (
            `+${Math.max(0, (matches['D'] || 0) - 2)}`
          ),
          expr: async matches => {
            this.bonus['D'] = matches['D'] - 2
          }
        },
        {
          faces: { 'D': 5 },
          valueLabel: () => (
            'x2'
          ),
          expr: async () => {
            this.multipliers['D'] = 2
          }
        },
        {
          faces: { 'H': 5 },
          valueLabel: () => `Full`,
          expr: async () => {
            store.player.hp = store.player.maxHp
          }
        },
        {
          faces: { 'B': 5 },
          valueLabel: () => `Win`,
          expr: async () => {
            this.npc.hp = 0
          }
        },
      ],
      /**
       * Combos gained via items during combat
       * {
       *   faces: { 'A': 5 } // faces to match in hand, this is optional
       *   expr: matches => {} // when matches, apply this function
       *   turns: 0 // turns left
       * }
       */
      bonusCombos: [],
      /**
       * Faces multipliers
       * {
       *   'face': multiplier
       * }
       */
      multipliers: {},
      currentMultiplier: 0,
      ...data,
    })
  }

  get processing() { return this.state.processing }
  set processing(value) { this.state.processing = value }

  get npcId() { return this.state.npcId }
  set npcId(value) { this.state.npcId = value }

  get npc() {
    return this.state.npcId
      ? store.npcs.get(this.state.npcId)
      : undefined
  }
  set npc(value) {
    if (value) {
      this.state.npcId = value.id
    } else {
      this.state.npcId = null
    }
  }

  get turn() { return this.state.turn }
  set turn(value) { this.state.turn = value }

  get bonus() { return this.state.bonus }
  set bonus(value) { this.state.bonus = value }

  get rolls() { return this.state.rolls }
  set rolls(value) { this.state.rolls = value }

  get ended() { return this.state.ended }
  set ended(value) { this.state.ended = value }

  get won() { return this.state.won }
  set won(value) { this.state.won = value }

  get selected() { return this.state.selected }
  set selected(value) { this.state.selected = value }
  get hasSelected() { return this.selected.length > 0 }

  get combos() { return this.state.combos }

  get bonusCombos() { return this.state.bonusCombos }
  set bonusCombos(value) { this.state.bonusCombos = value }

  get multipliers() { return this.state.multipliers }
  set multipliers(value) { this.state.multipliers = value }

  get currentMultiplier() { return this.state.currentMultiplier }
  set currentMultiplier(value) { this.state.currentMultiplier = value }

  addBonusCombo(combo, turns = -1) {
    this.bonusCombos.push({ ...combo, turns })
  }

  async nextTurn() {
    this.processing = true
    log('Next turn started')

    this.bonus = {}
    this.turn += 1
    await emit.call(this, 'onTurn', this.turn)

    store.player.rolls = store.player.maxRolls

    // decrement turns left for bonus combos
    this.bonusCombos.forEach(c => {
      if (c.turns !== -1) {
        c.turns -= 1
      }
    })
    this.bonusCombos = this.bonusCombos.filter(c => c.turns === 0)

    await delay(250)

    this.done = []

    await this.roll([])
    this.processing = false
  }

  async onTurn(turn) {}

  processBuffs() {
    this.buffs.forEach(b => {
      b.turns -= 1
    })
    this.buffs = this.buffs.filter(b => b.turns <= 0)
  }

  canReroll(showMessage) {
    if (!this.hasSelected) {
      if (showMessage) {
        log('You need to select dice to reroll first')
      }
      return false
    }
    if (store.player.rolls <= 0) {
      if (showMessage) {
        log('You cannot reroll anymore')
      }
      return false
    }
    return true
  }

  /**
   * Reroll selected dice
   * @returns {Promise<void>}
   */
  async reroll() {
    if (!this.canReroll(true)) {
      return false
    }
    return this.roll(this.selected)
  }

  async roll(indexes) {
    this.processing = true
    await delay(250)

    store.game.playSound('dice-roll')

    store.player.rolls -= 1

    if (indexes.length === 0) {
      for (let i = 0; i < store.player.dice.length; i++) {
        indexes.push(i)
      }
    }

    this.selected = []

    await Promise.all(indexes.map(i => new Promise(async resolve => {
      const die = store.player.dice[i]
      const count = random(5, 10)
      for (let c = 0; c < count; c++) {
        await delay(50)
        die.value = random(1, 6)
      }
      resolve()
    })))

    this.processing = false

    store.player.processBuffs(false, true)
    this.npc.processBuffs(false, true)

    return true
  }

  /**
   * Validates if the faces of a combo are all matching the dice
   *
   * @param combo
   * @returns {object}
   */
  validateCombo(combo) {
    const faceKeys = Object.keys(combo.faces)
    let matches = {}
    faceKeys.forEach(key => {
      const c = store.player.dice.filter(d => d.faces[d.value - 1].value === key)
      if (c.length >= combo.faces[key]) {
        matches[key] = c.length
      }
    })
    return Object.keys(matches).length === faceKeys.length ? matches : {}
  }

  /**
   * Find matching combos and bonusCombos based on the current dice roll faces
   *
   * @returns {Promise<void>}
   */
  async checkCombos() {
    this.multipliers = {}
    const combos = [...this.combos, ...this.bonusCombos]
    for (let c of combos) {
      if (!c.faces) {
        await c.expr({})
      } else {
        const matches = this.validateCombo(c)
        if (Object.keys(matches).length > 0) {
          await c.expr(matches)
        }
      }
    }
  }

  comboDice(combo) {
    const dice = []
    const bd = store.config.battleDice
    Object.keys(combo.faces).forEach(face => {
      for (let i = 0; i < combo.faces[face]; i++) {
        dice.push({ faces: bd, value: bd.findIndex(d => d.value === face) + 1 })
      }
    })
    return dice
  }

  comboLabel(combo) {
    const matches = this.validateCombo(combo)
    return combo.valueLabel(matches)
  }

  activeCombo(combo) {
    if (this.processing) {
      return false
    }
    const matches = this.validateCombo(combo)
    return Object.keys(matches).length > 0
  }

  canStartCombat(showMessage) {
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('combat', showMessage));
  }

  async startCombat() {
    if (!this.canStartCombat(true)) {
      return false
    }

    this.bonus = {}
    this.turn = 1
    store.player.rolls = store.player.maxRolls

    this.done = []
    this.selected = []

    await emit.call(this, 'onStartCombat')

    await this.roll([])

    return true
  }

  async onStartCombat() {}

  canEndCombat(showMessage) {
    return this.npc.hp <= 0 || store.player.hp <= 0
  }

  async endCombat() {
    if (!this.canEndCombat(true)) {
      return false
    }

    this.ended = true
    store.player.combat = null
    await emit.call(this, 'onEndCombat')

    this.won = false

    // remove combat buffs
    store.player.removeBuff('dice')
    store.player.removeBuff('roll')

    if (store.player.hp > 0) {
      this.won = true
      log('You have won the battle')
      await emit.call(this, 'onWin')
      return true
    }

    log('You have lost the battle')
    await emit.call(this, 'onLose')
    return true
  }

  async onEndCombat() {}

  async onWin() {}

  async onLose() {}

  isDone(index) {
    return this.done.includes(index)
  }

  isSelected(index) {
    return this.selected.includes(index)
  }

  canSelect(index, showMessage) {
    if (this.processing) {
      return false
    }
    if (store.player.rolls <= 0) {
      if (showMessage) {
        log('You have no rerolls left')
      }
      return false
    }
    if (this.isSelected(index)) {
      if (showMessage) {
        log('This die is already selected')
      }
      return false
    }
    return true
  }

  async select(index) {
    if (!this.canSelect(index, true)) {
      return false
    }
    this.selected.push(index)
    await emit.call(this, 'onSelect', index)
    return true
  }

  async onSelect(index) {}

  canUnselect(index, showMessage) {
    if (!this.isSelected(index)) {
      if (showMessage) {
        log('This die is not selected')
      }
      return false
    }
    return true
  }

  async unselect(index) {
    if (!this.canUnselect(index, true)) {
      return false
    }
    const i = this.selected.indexOf(index)
    this.selected.splice(i, 1)
    await emit.call(this, 'onUnselect', index)
    return true
  }

  async onUnselect(index) {}

  async toggleSelect(index) {
    if (this.isSelected(index)) {
      return this.unselect(index)
    }
    return this.select(index)
  }

  canEndTurn(showMessage) {
    return true
  }

  /**
   * Execute dice actions
   *
   * @returns {Promise<boolean|void>}
   */
  async endTurn() {
    if (!this.canEndTurn(true)) {
      return false
    }

    this.processing = true

    await this.checkCombos()

    const attacks = []
    const lifes = []
    const bombs = []
    const busts = []

    for (let i = 0; i < store.player.dice.length; i++) {
      const die = store.player.dice[i]

      switch (store.config.battleDice[die.value - 1].value) {
        case 'A': // sword
          attacks.push(i)
          break
        case 'H': // heart
          lifes.push(i)
          break
        case 'B': // bomb
          bombs.push(i)
          break
        case 'X': // shield buster
          busts.push(i)
          break
        default:
      }
    }

    if (busts.length) {
      await this.bustShield(busts)
      this.done = [...this.done, ...busts]
    }
    if (attacks.length) {
      await this.attack(attacks)
      this.done = [...this.done, ...attacks]
    }
    if (bombs.length) {
      await this.damage(bombs)
      this.done = [...this.done, ...bombs]
    }
    if (this.npc.swordDice.length) {
      await this.npcAttack(this.npc.swordDiceIndexes)
      this.done = [...this.done, ...store.player.shieldDiceIndexes]
    }
    if (lifes.length) {
      await this.gainLife(lifes)
      this.done = [...this.done, ...lifes]
    }

    store.player.processBuffs(true)
    this.npc.processBuffs(true)

    // this will check first if it needs to end the combat
    if (!(await this.endCombat())) {
      await this.nextTurn()
    }

    this.processing = false

    return true
  }

  async highlightDice(name, dice, multiplier) {
    const promises = [
      anime.timeline({
        duration: 1000,
        targets: dice.map(i => `.${name}-die-${i}`),
      })
        .add({ scale: 1.25 })
        .add({ scale: 1 }, 500)
        .finished
    ]

    if (multiplier) {
      this.currentMultiplier = multiplier
      anime.set('.multiplier', {
        scale: 0,
        opacity: 0,
      })
      const r = document.querySelector('.multiplier').getBoundingClientRect()
      multiplierParticles(r.left + r.width * 0.5, r.top + r.height * 0.5)
      promises.push(
        anime.timeline({
          duration: 1500,
          targets: '.multiplier',
        })
          .add({ scale: 1.5, opacity: 1 })
          .add({ scale: 0, opacity: 0 }, 500)
          .finished
      )
    }

    return Promise.all(promises).then(() => {
      this.currentMultiplier = 0
    })
  }

  async showDamage(name, dmg, fx = true) {
    const hitLabelEl = document.querySelector(`.${name}-hit-label`)
    hitLabelEl.textContent = dmg.toString()

    anime.set(`.${name}-hit`, {
      scale: 0,
      opacity: 0,
    })

    if (fx) {
      store.game.playSound('hit')
    }

    return anime.timeline({
      targets: `.${name}-hit`,
      easing: 'spring(1, 80, 10, 20)',
    })
      .add({
        scale: 1,
        opacity: 1,
      })
      .add({
        scale: 0,
        opacity: 0,
      })
      .finished
  }

  /**
   * Apply attack dice to opponent
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async attack(dice) {
    const dmg = (dice.length - this.npc.shieldDice.length) * (this.multipliers['A'] || 1) + (this.bonus['A'] || 0)

    store.game.playSound('swing')
    await this.highlightDice('player', dice, this.multipliers['A'])

    const si = this.npc.shieldDiceIndexes
    if (si.length) {
      store.game.playSound('sword-hit')
      await this.highlightDice('npc', si)
    }

    if (dmg > 0) {
      log(`${store.player.name} attack for ${dmg} damage`)
      this.npc.hp -= dmg
      await this.showDamage('npc', dmg)
      await emit.call(this, 'onAttack', dmg)
    }
  }

  async onAttack(dmg) {}

  /**
   * Apply heart dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async gainLife(dice) {
    const hearts = dice.length
    await this.highlightDice('player', dice, this.multipliers['H'])
    if (hearts > 0) {
      const o = store.player.hp
      store.player.hp += dice.length
      const v = (store.player.hp - o) * (this.multipliers['H'] || 1) + (this.bonus['H'] || 0)
      if (v > 0) {
        log(`${store.player.name} gains ${v} life`)
        store.game.playSound('upgrade')
        await delay(500)
        await emit.call(this, 'onGainLife', v)
      }
    }
  }

  async onGainLife(hearts) {}

  /**
   * Apply bomb dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async damage(dice) {
    const dmg = dice.length
    await this.highlightDice('player', dice)
    if (dmg > 0) {
      log(`${store.player.name} receive ${dmg} damage(s)`)
      store.game.playSound('bomb')
      store.player.hp -= dmg
      await this.showDamage('player', dmg, false)
      await emit.call(this, 'onDamage', dice, dmg)
    }
  }

  async onDamage(dice, dmg) {}

  /**
   * Apply npc attack dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async npcAttack(dice) {
    // if skip turns left
    if (this.npc.skipTurns > 0) {
      this.npc.skipTurns -=1
      return false
    }

    if (this.npc.hp > 0) {
      this.processing = true

      const dmg = dice.length - (store.player.shieldDice.length * (this.multipliers['D'] || 1))  + (this.bonus['D'] || 0)

      store.game.playSound('swing')
      await this.highlightDice('npc', dice)

      if (store.player.shieldDice.length) {
        store.game.playSound('sword-hit')
        await this.highlightDice('player', store.player.shieldDiceIndexes, this.multipliers['D'])
      }

      if (dmg > 0) {
        log(`${this.npc.name} hits for ${dmg} damage(s)`)
        store.player.hp -= dmg
        await this.showDamage('player', dmg)
        await emit.call(this, 'onNpcAttack', dmg)
        this.processing = false
        return true
      }
      this.processing = false
    }
    return false
  }

  async onNpcAttack(dmg) {}

  /**
   * Apply shield buster dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async bustShield(dice) {
    if (this.npc.hp > 0) {
      const busters = dice.length
      await this.highlightDice('player', dice, this.multipliers['X']) + (this.bonus['X'] || 0)
      if (busters > 0) {
        const npcShields = this.npc.shieldDice.length;
        const v = (npcShields - busters <= 0
          ? npcShields
          : npcShields - busters) * (this.multipliers['X'] || 1)
        if (v > 0) {
          store.game.playSound('metal-hit')
          log(`${store.player.name} bust ${v} shield(s)`)
          for (let c = 0; c < v; c++) {
            const i = this.npc.shieldDiceIndexes[0]
            this.npc.dice.splice(i, 1)
          }
          await emit.call(this, 'onBustShield', v)
        }
      }
    }
  }

  async onBustShield(dmg) {}
}

mixin(Combat, [
  Requirements,
])

registerClass(Combat)
