import random from 'lodash/random'
import anime from 'animejs'
import { Entity, IEntityData, SetupData } from '../entity'
import { emit, log, delay, mixin, registerClass, can, LOG_WARN, LOG_ERROR } from '@/utils'
import { IRequirements, IRequirementsData, Requirements } from '@/mixins/requirements'
import { multiplier as multiplierParticles } from '@/particles'
import { Npc } from '@/classes/npcs/npc'
import { Dice, DiceIndexes } from '@/store/config'

export interface ICombo {
  faces: { [key: string]: number }
  valueLabel: (matches: { [key: string]: number }) => string
  expr: (matches: { [key: string]: number }) => Promise<void>
  turns?: number
}

export interface IBonusCombo extends ICombo {
  turns: number
}

export type Multipliers = { [key: string]: number }

export interface IBonusMultiplier {
  multiplier: number
  bonus: number
}

export interface ICombatData extends IRequirementsData, IEntityData {
  // is the combat engine processing?
  processing?: boolean
  // npc id that we are fighting against
  npcId?: string | null
  // current turn
  turn?: number
  // current turn bonus to apply
  bonus?: { [key: string]: number }
  // rolls left for the turn
  rolls?: number
  // has the combat ended
  ended?: boolean
  // did you win the battle?
  won?: boolean
  // selected dice indexes
  selected?: number[]
  // done action dice indexes
  done?: number[]
  // combos
  combos?: ICombo[]
  /**
   * Combos gained via items during combat
   * {
   *   faces: { 'A': 5 }   // faces to match in hand, this is optional
   *   expr: matches => {} // when matches, apply this function
   *   turns: 0            // turns left
   * }
   */
  bonusCombos?: IBonusCombo[]
  /**
   * Faces multipliers
   * {
   *   'face': multiplier
   * }
   */
  multipliers?: Multipliers
  // current active multiplier
  currentMultiplier?: number
}

export interface Combat extends IRequirements {}

export class Combat extends Entity {
  constructor(data?: ICombatData) {
    super(data)
  }

  setupInstance(data?: ICombatData): SetupData | undefined {
    return super.setupInstance({
      processing: false,
      npcId: null,
      turn: 1,
      bonus: {},
      rolls: window.store.player.maxRolls,
      ended: false,
      won: false,
      selected: [],
      done: [],
      combos: [
        {
          faces: { 'A': 3 },
          valueLabel: (matches: { [key: string]: number }) => (
            `+${Math.max(0, (matches['A'] || 0) - 2)}`
          ),
          expr: async (matches: { [key: string]: number }) => {
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
            window.store.player.hp = window.store.player.maxHp
          }
        },
        {
          faces: { 'B': 5 },
          valueLabel: () => `Win`,
          expr: async () => {
            if (this.npc) {
              this.npc.hp = 0
            }
          }
        },
      ] as ICombo[],
      bonusCombos: [],
      multipliers: {},
      currentMultiplier: 0,
      ...(data || {})
    })
  }

  get isCombat(): boolean { return true }

  get processing(): boolean { return this.state.processing }
  set processing(value) { this.state.processing = value }

  get npcId(): string | null { return this.state.npcId }
  set npcId(value) { this.state.npcId = value }

  get npc(): Npc | undefined { return window.store.npcs.get(this.npcId) }
  set npc(value: Npc | undefined | null) { this.state.npcId = value?.id || null }

  get turn() { return this.state.turn }
  set turn(value) { this.state.turn = value }

  get bonus() { return this.state.bonus }
  set bonus(value) { this.state.bonus = value }

  get rolls() { return this.state.rolls }
  set rolls(value) { this.state.rolls = value }

  get ended(): boolean { return this.state.ended }
  set ended(value) { this.state.ended = value }

  get won(): boolean { return this.state.won }
  set won(value) { this.state.won = value }

  get selected() { return this.state.selected }
  set selected(value) { this.state.selected = value }
  get hasSelected() { return this.selected.length > 0 }

  get combos(): ICombo[] { return this.state.combos }

  get bonusCombos(): IBonusCombo[] { return this.state.bonusCombos }
  set bonusCombos(value) { this.state.bonusCombos = value }

  get multipliers(): Multipliers { return this.state.multipliers }
  set multipliers(value) { this.state.multipliers = value }

  get currentMultiplier(): number { return this.state.currentMultiplier }
  set currentMultiplier(value) { this.state.currentMultiplier = value }

  get done(): number[] { return this.state.done }
  set done(value) { this.state.done = value }

  addBonusCombo(combo: ICombo, turns = -1): void {
    this.bonusCombos.push({ ...combo, turns })
  }

  async nextTurn(): Promise<void> {
    this.processing = true
    log('Next turn started', LOG_WARN)

    this.bonus = {}
    this.turn += 1
    await emit(this, 'onTurn', this.turn)

    window.store.player.rolls = window.store.player.maxRolls

    // make sure shields buff is processed
    // if (window.store.player.shieldsBuffTurns > 0) {
    //   window.store.player.shieldsBuffTurns -= 1
    //   if (window.store.player.shieldsBuffTurns <= 0) {
    //     window.store.player.shieldsBuff = 0
    //   }
    // }

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

  async onTurn(turn: number): Promise<void> {}

  canReroll(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.hasSelected,
        log: () => 'You need to select dice to reroll first',
        level: LOG_WARN
      },
      {
        expr: () => window.store.player.rolls <= 0,
        log: () => 'You cannot reroll anymore'
      },
    ], showMessage)
  }

  /**
   * Reroll selected dice
   * @returns {Promise<void>}
   */
  async reroll(): Promise<boolean> {
    if (!this.canReroll(true)) {
      return false
    }
    return this.roll(this.selected)
  }

  async roll(indexes: DiceIndexes): Promise<boolean> {
    this.processing = true
    await delay(250)

    window.store.game.playSound('dice-roll')

    window.store.player.rolls -= 1

    if (indexes.length === 0) {
      for (let i = 0; i < window.store.player.dice.length; i++) {
        indexes.push(i)
      }
    }

    this.selected = []

    await Promise.all(indexes.map(i => new Promise(async (resolve: (value?: unknown) => void) => {
      const die = window.store.player.dice[i]
      const count = random(5, 10)
      for (let c = 0; c < count; c++) {
        await delay(50)
        die.value = random(1, 6)
      }
      resolve()
    })))

    this.processing = false

    window.store.player.processBuffs(false, true)
    this.npc?.processBuffs(false, true)

    return true
  }

  /**
   * Validates if the faces of a combo are all matching the dice
   *
   * @param combo
   * @returns {object}
   */
  validateCombo(combo: ICombo): { [key: string]: number } {
    const faceKeys = Object.keys(combo.faces)
    let matches: { [key: string]: number } = {}
    faceKeys.forEach(key => {
      const c = window.store.player.dice.filter(d => d.faces[d.value - 1].value === key)
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
  async checkCombos(): Promise<void> {
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

  comboDice(combo: ICombo): Dice {
    const dice: Dice = []
    const bd = window.store.config.battleDice
    Object.keys(combo.faces).forEach(face => {
      for (let i = 0; i < combo.faces[face]; i++) {
        dice.push({ faces: bd, value: bd.findIndex(d => d.value === face) + 1 })
      }
    })
    return dice
  }

  comboLabel(combo: ICombo): string {
    const matches = this.validateCombo(combo)
    return combo.valueLabel(matches)
  }

  activeCombo(combo: ICombo): boolean {
    if (this.processing) {
      return false
    }
    const matches = this.validateCombo(combo)
    return Object.keys(matches).length > 0
  }

  canStartCombat(showMessage?: boolean): boolean {
    return can(this, [], showMessage, 'combat')
  }

  async startCombat(): Promise<boolean> {
    if (!this.canStartCombat(true)) {
      return false
    }

    this.bonus = {}
    this.turn = 1
    window.store.player.rolls = window.store.player.maxRolls

    this.done = []
    this.selected = []

    await emit(this, 'onStartCombat')

    await this.roll([])

    return true
  }

  async onStartCombat(): Promise<void> {}

  canEndCombat(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !!this.npc && this.npc.hp > 0 && window.store.player.hp > 0
      },
    ], showMessage)
  }

  async endCombat(): Promise<boolean> {
    if (!this.canEndCombat(true)) {
      return false
    }

    this.ended = true
    window.store.player.combat = null
    await emit(this, 'onEndCombat')

    this.won = false

    // remove combat buffs
    window.store.player.removeBuff('dice')
    window.store.player.removeBuff('roll')
    window.store.player.removeBuff('sword')
    window.store.player.removeBuff('shield')

    if (window.store.player.hp > 0) {
      this.won = true
      log('You have won the battle', LOG_WARN)
      window.store.player.xp += (this.npc?.lvl || 1) * window.store.config.combatXP
      await emit(this, 'onWin')
      return true
    }

    log('You have lost the battle', LOG_ERROR)
    await emit(this, 'onLose')
    return true
  }

  async onEndCombat(): Promise<void> {}

  async onWin(): Promise<void> {}

  async onLose(): Promise<void> {}

  isDone(index: number): boolean {
    return this.done.includes(index)
  }

  isSelected(index: number): boolean {
    return this.selected.includes(index)
  }

  canSelect(index: number, showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.processing,
      },
      {
        expr: () => window.store.player.rolls <= 0,
        log: () => 'You have no rerolls left'
      },
      {
        expr: () => this.isSelected(index),
        log: () => 'This die is already selected'
      },
    ], showMessage)
  }

  async select(index: number): Promise<boolean> {
    if (!this.canSelect(index, true)) {
      return false
    }
    this.selected.push(index)
    await emit(this, 'onSelect', index)
    return true
  }

  async onSelect(index: number): Promise<void> {}

  canUnselect(index: number, showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isSelected(index),
        log: () => 'This die is not selected'
      },
    ], showMessage)
  }

  async unselect(index: number): Promise<boolean> {
    if (!this.canUnselect(index, true)) {
      return false
    }
    const i = this.selected.indexOf(index)
    this.selected.splice(i, 1)
    await emit(this, 'onUnselect', index)
    return true
  }

  async onUnselect(index: number): Promise<void> {}

  async toggleSelect(index: number): Promise<boolean> {
    if (this.isSelected(index)) {
      return this.unselect(index)
    }
    return this.select(index)
  }

  canEndTurn(showMessage?: boolean): boolean {
    return true
  }

  /**
   * Execute dice actions
   *
   * @returns {Promise<boolean|void>}
   */
  async endTurn(): Promise<boolean> {
    if (!this.canEndTurn(true)) {
      return false
    }

    this.processing = true

    await this.checkCombos()

    const attacks: DiceIndexes = []
    const lifes: DiceIndexes = []
    const bombs: DiceIndexes = []
    const busts: DiceIndexes = []

    for (let i = 0; i < window.store.player.dice.length; i++) {
      const die = window.store.player.dice[i]

      switch (window.store.config.battleDice[die.value - 1].value) {
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

    // Npc attacks
    if (this.npc && this.npc.swordDice.length) {
      await this.npcAttack(this.npc.swordDiceIndexes)
      this.done = [...this.done, ...window.store.player.shieldDiceIndexes]
    }

    if (lifes.length) {
      await this.gainLife(lifes)
      this.done = [...this.done, ...lifes]
    }

    window.store.player.processBuffs(true)
    this.npc?.processBuffs(true)

    // this will check first if it needs to end the combat
    if (!(await this.endCombat())) {
      await this.nextTurn()
    }

    this.processing = false

    return true
  }

  async highlightDice(name: string, dice: DiceIndexes, multiplier: number = 0): Promise<void> {
    const promises = [
      anime.timeline({
        duration: 1000,
        targets: dice.map(i => `.${name}-die-${i}`),
      })
        .add({ scale: 1.25 })
        .add({ scale: 1 }, 500)
        .finished
    ]

    if (multiplier > 1) {
      this.currentMultiplier = multiplier
      anime.set('.multiplier', {
        scale: 0,
        opacity: 0,
      })
      // @ts-ignore
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

  async showDamage(name: string, dmg: number, fx = true): Promise<void> {
    const hitLabelEl = document.querySelector(`.${name}-hit-label`)
    if (hitLabelEl) {
      hitLabelEl.textContent = dmg.toString()
    }

    anime.set(`.${name}-hit`, {
      scale: 0,
      opacity: 0,
    })

    if (fx) {
      window.store.game.playSound('hit')
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
   * Return the multipliers and bonus for a type
   *
   * @param type
   * @returns {{multiplier: (number), bonus: (number)}}
   */
  multiplierBonus(type: string): IBonusMultiplier {
    return {
      multiplier: this.multipliers[type] || 1,
      bonus: this.bonus[type] || 0,
    }
  }

  /**
   * Apply attack dice to opponent
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async attack(dice: DiceIndexes): Promise<void> {
    const extraSwordCount = window.store.player.extraSwordDice.length
    const { multiplier, bonus } = this.multiplierBonus('A')

    const dmg = ((dice.length + extraSwordCount) - (this.npc ? this.npc.shieldDice.length : 0)) * multiplier
      + bonus + window.store.player.sumOfBuffs('dmg')

    window.store.game.playSound('swing')
    await Promise.all([
      this.highlightDice('player', dice, multiplier),
      extraSwordCount
        ? this.highlightDice('sword', window.store.player.extraSwordDiceIndexes)
        : (resolve: () => void) => resolve(),
    ])

    const si = (this.npc ? this.npc.shieldDiceIndexes : [])
    if (si.length) {
      window.store.game.playSound('sword-hit')
      await this.highlightDice('npc', si)
    }

    if (dmg > 0) {
      log(`${window.store.player.nameProper} attack for ${dmg} damage`, LOG_WARN)
      if (this.npc) {
        this.npc.hp -= dmg
      }
      await this.showDamage('npc', dmg)
      await emit(this, 'onAttack', dmg)
    }
  }

  async onAttack(dmg: number): Promise<void> {}

  /**
   * Apply heart dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async gainLife(dice: DiceIndexes): Promise<void> {
    const { multiplier, bonus } = this.multiplierBonus('H')

    await this.highlightDice('player', dice, multiplier)

    const hearts = dice.length
    if (hearts > 0) {
      const o = window.store.player.hp
      window.store.player.hp += dice.length
      const v = (window.store.player.hp - o) * multiplier + bonus
      if (v > 0) {
        log(`${window.store.player.nameProper} gains ${v} life`, LOG_WARN)
        await delay(500)
        await emit(this, 'onGainLife', v)
      }
    }
  }

  async onGainLife(hearts: number): Promise<void> {}

  /**
   * Apply bomb dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async damage(dice: DiceIndexes): Promise<void> {
    const dmg = dice.length
    await this.highlightDice('player', dice)
    if (dmg > 0) {
      log(`${window.store.player.nameProper} receive ${dmg} damage(s)`, LOG_ERROR)
      window.store.game.playSound('bomb')
      window.store.player.hp -= dmg
      await this.showDamage('player', dmg, false)
      await emit(this, 'onDamage', dice, dmg)
    }
  }

  async onDamage(dice: DiceIndexes, dmg: number): Promise<void> {}

  /**
   * Apply npc attack dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async npcAttack(dice: DiceIndexes): Promise<boolean> {
    // if skip turns left
    if (this.npc && this.npc.skipTurns > 0) {
      this.npc.skipTurns -=1
      return false
    }

    if (this.npc && this.npc.hp > 0) {
      this.processing = true

      const shieldCount = window.store.player.shieldDice.length
      const extraShieldCount = window.store.player.extraShieldDice.length
      const { multiplier, bonus } = this.multiplierBonus('D')

      const dmg = dice.length - (shieldCount + extraShieldCount) * multiplier + bonus

      window.store.game.playSound('swing')
      await this.highlightDice('npc', dice)

      if (shieldCount || extraShieldCount) {
        window.store.game.playSound('sword-hit')
        await Promise.all([
          shieldCount
            ? this.highlightDice('player', window.store.player.shieldDiceIndexes, multiplier)
            : (resolve: () => void) => resolve(),
          extraShieldCount
            ? this.highlightDice('shield', window.store.player.extraShieldDiceIndexes, shieldCount ? undefined : multiplier)
            : (resolve: () => void) => resolve(),
        ])
      }

      if (dmg > 0) {
        log(`${this.npc.nameProper} hits for ${dmg} damage(s)`, LOG_WARN)
        window.store.player.hp -= dmg
        await this.showDamage('player', dmg)
        await emit(this, 'onNpcAttack', dmg)
        this.processing = false
        return true
      }
      this.processing = false
    }
    return false
  }

  async onNpcAttack(dmg: number): Promise<void> {}

  /**
   * Apply shield buster dice
   *
   * @param dice
   * @returns {Promise<void>}
   */
  async bustShield(dice: DiceIndexes): Promise<void> {
    if (this.npc && this.npc.hp > 0) {
      const { multiplier, bonus } = this.multiplierBonus('X')

      await this.highlightDice('player', dice, multiplier)

      const busters = dice.length
      if (busters > 0) {
        const npcShields = this.npc.shieldDice.length
        const v = (npcShields - busters <= 0
          ? npcShields
          : npcShields - busters) * multiplier + bonus
        if (v > 0) {
          window.store.game.playSound('metal-hit')
          log(`${window.store.player.nameProper} bust ${v} shield(s)`, LOG_WARN)
          for (let c = 0; c < v; c++) {
            const i = this.npc.shieldDiceIndexes[0]
            this.npc.dice.splice(i, 1)
          }
          await emit(this, 'onBustShield', v)
        }
      }
    }
  }

  async onBustShield(dmg: number): Promise<void> {}
}

mixin(Combat, [
  Requirements,
])

registerClass(Combat)
