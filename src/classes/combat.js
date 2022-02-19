import random from 'lodash/random'
import anime from 'animejs'
import Entity from '../entity'
import { store } from '@/store'
import { arrayFromFrequencies, emit, log, pickRandom } from '@/utils'

export const actions = [
  {
    name: 'dodge',
    icon: 'fluent:arrow-forward-24-filled',
    label: 'Dodge',
    description: 'Dodge the ennemy\'s attack',
    color: '',
    defensive: true,
    atk: 0,
    def: 3,
    ap: 2,
    mods: ['dex'],
  },
  {
    name: 'cover',
    icon: 'fa6-solid:arrow-turn-down',
    label: 'Cover',
    description: 'Take cover behind a terrain feature',
    color: '',
    defensive: true,
    atk: 0,
    def: 5,
    ap: 3,
    mods: ['dex'],
  },
  {
    name: 'deflect',
    icon: 'fluent:arrow-bounce-16-filled',
    label: 'Deflect',
    description: 'Use your strength and dexterity to deflect the oncoming attack',
    color: '',
    defensive: true,
    atk: 0,
    def: 8,
    ap: 4,
    mods: ['str', 'dex'],
  },
  {
    name: 'attack',
    icon: 'fa-solid:fist-raised',
    label: 'Attack',
    description: 'Attack with your equipped weapon',
    color: '',
    defensive: false,
    atk: 5,
    def: 0,
    ap: 2,
    mods: ['str'],
  },
]

export const actionFrequencies = {
  dodge: 30,
  cover: 20,
  deflect: 10,
  attack: 40,
}

const YOU = 1
const HIM = 2

export default class Combat extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      npcId: null,
      stats: {
        ap: 0,
        atk: 0,
        def: 0,
      },
      defenseQueue: null,
      retreat: false,
      // side active player 1: YOU, 2: HIM
      side: YOU,
      // current turn
      turn: 1,
      // has the combat ended
      ended: false,
      // did you win the battle?
      won: false,
      // your play hand
      hand: [],
      // selected action
      selected: [],
      ...data,
    })
  }

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

  get ended() { return this.state.ended }
  set ended(value) { this.state.ended = value }

  get won() { return this.state.won }
  set won(value) { this.state.won = value }

  get stats() { return this.state.stats }
  set stats(value) { this.state.stats = value }

  get defenseQueue() { return this.state.defenseQueue }
  set defenseQueue(value) { this.state.defenseQueue = value }

  get retreat() { return this.state.retreat }
  set retreat(value) { this.state.retreat = value }

  get side() { return this.state.side }
  set side(value) { this.state.side = value }

  get isYourTurn() { return this.side === YOU }

  get sideInstance() { return this.isYourTurn ? store.player : this.npc }
  get attackerInstance() { return this.isYourTurn ? store.player : this.npc }
  get defenderInstance() { return this.isYourTurn ? this.npc : store.player }

  get armorsDef() { return this.defenderInstance.equippedArmors.reduce((acc, a) => acc + a.def, 0) }

  get ap() { return this.sideInstance.ap }
  set ap(value) { this.sideInstance.ap = value }
  get maxAp() { return this.sideInstance.maxAp }

  get hand() { return this.state.hand }
  set hand(value) { this.state.hand = value }

  get selected() { return this.state.selected }
  set selected(value) { this.state.selected = value }

  get hasDefensiveSelected() {
    return this.selected.find(id => {
      const h = this.getHandAction(id)
      if (h) {
        const a = this.getAction(h.name)
        return a?.defensive
      }
      return false
    })
  }

  getAction(name) { return actions.find(m => m.name === name) }

  getHand(id) {
    return this.hand.find(h => h.id === id)
  }

  getHandAction(id) {
    const h = this.getHand(id)
    if (h) {
      return this.getAction(h.name)
    }
    return undefined
  }

  isSelected(id) { return this.selected.includes(id) }

  hasAPFor(ap) {
    return this.ap - ap >= 0
  }

  toggleCurrent() {
    if (this.isYourTurn) {
      this.side = HIM
    } else {
      this.side = YOU
    }
  }

  async nextTurn() {
    log('Next turn started')

    this.turn += 1
    this.toggleCurrent()
    this.defenseQueue = null
    await emit.call(this, 'onTurn')

    this.isAnimatingTurn = true
    await anime.timeline({
      targets: '.turn-label',
      duration: 750,
      endDelay: 250,
    })
      .add({ opacity: [0, 1], translateX: [-1000, 0] })
      .add({ opacity: [1, 0], translateX: [0, 2000] }, 2000)
      .finished
    this.isAnimatingTurn = false

    if (this.isYourTurn) {
      this.ap = this.maxAp
      if (this.canDrawAction()) {
        await this.drawAction()
      }
    } else {
      this.ap += 1
      await this.ai()
    }
  }

  async onTurn() {}

  async ai() {
    return new Promise(async resolve => {
      if (this.ap === this.maxAp) {
        await this.executeAction('attack')
        this.ap = 0
      }
      await emit.call(this, 'onAi')
      setTimeout(async () => {
        await this.nextTurn()
        resolve()
      }, 500)
    })
  }

  async onAi() {}

  canRetreat(showMessage) {
    return true
  }

  async attemptRetreat() {
    if (!this.canRetreat(true)) {
      return false
    }
    this.retreat = true
    log('You attempt a retreat')
    return true
  }

  canStartCombat(showMessage) {
    return true
  }

  async startCombat() {
    if (!this.canStartCombat(true)) {
      return false
    }

    // Reset Action Points
    this.npc.ap = this.npc.maxAp
    store.player.ap = store.player.maxAp

    // Draw player's hand
    await Promise.all(new Array(store.config.maxHand).fill('').map(() => this.drawAction()))

    await emit.call(this, 'onStartCombat')

    return true
  }

  async onStartCombat() {}

  canEndCombat(showMessage) {
    return this.attackerInstance.hp <= 0
      || this.defenderInstance.hp <= 0
      || this.retreat
  }

  async endCombat() {
    if (!this.canEndCombat(true)) {
      return false
    }

    this.ended = true
    store.player.combat = null

    await emit.call(this, 'onEndCombat')

    this.won = false

    if (store.player.hp > 0) {
      this.won = true
      log('You have won the battle')
      await emit.call(this, 'onWin')
    } else if (this.npc.hp > 0) {
      log('You have lost the battle')
      await emit.call(this, 'onLose')
    } else if (this.retreat) {
      log('You have successfully retreated from battle')
      await emit.call(this, 'onRetreat')
    }

    return true
  }

  async onEndCombat() {}

  async onWin() {}

  async onLose() {}

  async onRetreat() {}

  /**
   * Calculate the attack score for an action
   *
   * @param name
   * @returns {number|*}
   */
  attack(name) {
    const a = this.getAction(name)
    if (a) {
      const mods = a.mods.reduce((acc, a) => acc + (this.attackerInstance[a] || 0), 0)
      const dmg = a.atk + (this.attackerInstance.equippedWeapon?.atk || 1) + mods
      return dmg + random(dmg)
    }
    return 0
  }

  /**
   * Calculate the defence score for an action
   *
   * @param name
   * @returns {number|*}
   */
  defense(name) {
    const a = this.getAction(name)
    if (a) {
      const mods = a.mods.reduce((acc, a) => acc + (this.defenderInstance[a] || 0), 0)
      const def = a.def + this.armorsDef + mods
      return def + random(def)
    }
    return 0
  }

  canSelect(id, showMessage) {
    const a = this.getHandAction(id)
    if (!a) {
      if (showMessage) {
        log(`${name} is an invalid move name`)
      }
      return false
    }
    // if already has selected this action
    if (this.isSelected(id)) {
      if (showMessage) {
        log(`You have already selected this action`)
      }
      return false
    }
    // if defensive action and already in your has a defense action queued
    if (a.defensive && this.defenseQueue) {
      if (showMessage) {
        log(`There is already a defensive move readied`)
      }
      return false
    }
    // if defensive action and already has a defense selected
    if (a.defensive && this.hasDefensiveSelected) {
      if (showMessage) {
        log(`You already have a defensive action selected`)
      }
      return false
    }
    // is there enough action points left to select this move
    if (!this.hasAPFor(a.ap)) {
      if (showMessage) {
        log(`Not enough action points to select ${a.label.toLowerCase()}`)
      }
      return false
    }
    return true
  }

  /**
   * Add an action to selected actions
   *
   * @param id
   * @returns {Promise<boolean|void>}
   */
  async select(id) {
    if (!this.canSelect(id, true)) {
      return false
    }
    this.selected.push(id)
    const a = this.getHandAction(id)
    this.ap -= a.ap
    await emit.call(this, 'onSelect', a)
    return true
  }

  async onSelect(action) {}

  canUnselect(id, showMessage) {
    const a = this.getHandAction(id)
    if (!a) {
      if (showMessage) {
        log(`${id} is an invalid hand action id`)
      }
      return false
    }
    // if does not have this action selected
    if (!this.isSelected(id)) {
      if (showMessage) {
        log('You have not selected this action')
      }
      return false
    }
    return true
  }

  /**
   * Add an action to selected actions
   *
   * @param id
   * @returns {Promise<boolean|void>}
   */
  async unselect(id) {
    if (!this.canUnselect(id, true)) {
      return false
    }
    const i = this.selected.indexOf(id)
    this.selected.splice(i, 1)
    const a = this.getHandAction(id)
    this.ap += a.ap
    await emit.call(this, 'onUnselect', a)
    return true
  }

  async onUnselect(action) {}

  async toggleSelect(id) {
    if (this.isSelected(id)) {
      return this.unselect(id)
    }
    return this.select(id)
  }

  /**
   * Check if all selected actions can be executed
   *
   * @param selection
   * @param showMessage
   * @returns {boolean}
   */
  canExecute(selection, showMessage) {
    const sel = selection || this.selected
    for (let id of sel) {
      const a = this.getHandAction(id)
      if (!a) {
        if (showMessage) {
          log('You do not have this card in your hand')
        }
        return false
      }
    }
    return true
  }

  async executeAction(name, id) {
    const a = this.getAction(name)

    if (typeof a.fn === 'function') {
      if (!this[a.fn]()) {
        return false
      }
    }

    if (a.defensive) {
      // Queue a defensive action
      this.defenseQueue = a
    } else {
      const atk = this.attack(name)
      const def = this.defense(name)
      const dmg = atk - def

      log(`${this.attackerInstance.name} attacks ${this.defenderInstance.name} for ${dmg} damages`)

      if (dmg > 0 && id) {
        const hitLabelEl = document.querySelector('.hit-label')
        hitLabelEl.textContent = dmg.toString()

        anime.set('.hit', {
          scale: 0,
          opacity: 0,
        })

        await anime({
          duration: 1000,
          targets: `.card-${id}`,
          translateX: -1000,
          opacity: 0,
        }).finished

        await anime.timeline({
          easing: 'spring(1, 80, 10, 20)'
        })
          .add({
            targets: `.hit`,
            scale: 1,
            opacity: 1,
          })
          .add({
            targets: `.hit`,
            scale: 0,
            opacity: 0,
          })
          .finished

        await this.damage(dmg)
      } else {
        await this.block(Math.abs(dmg))
      }
    }
  }

  /**
   * Execute selected actions
   *
   * @param selection
   * @returns {Promise<boolean|void>}
   */
  async execute(selection) {
    const sel = selection || this.selected
    if (!this.canExecute(sel, true)) {
      return false
    }

    for (let id of sel) {
      const h = this.getHand(id)
      await this.executeAction(h.name, id)
    }

    if (!this.isYourTurn) {
      this.ap = 0
    }

    await this.destroySelected()
    this.selected = []

    // this will check first if it needs to end the combat
    if (!(await this.endCombat())) {
      await this.nextTurn()
    }

    return true
  }

  /**
   * Apply damage to opponent
   *
   * @param dmg
   * @returns {Promise<void>}
   */
  async damage(dmg) {
    this.defenderInstance.hp -= dmg
    log(`${this.attackerInstance.name} dealt ${dmg} damages to ${this.defenderInstance.name}`)
    await emit.call(this, 'onDamage', dmg)
  }

  async onDamage(dmg) {}

  /**
   * Defender successfully blocked the attack
   *
   * @param dmg
   * @returns {Promise<void>}
   */
  async block(dmg) {
    log(`${this.defenderInstance.name} blocked ${dmg} damages from ${this.attackerInstance.name}`)
    await emit.call(this, 'onBlock', dmg)
  }

  async onBlock(dmg) {}

  canDrawAction(showMessage) {
    if (this.hand.length >= store.config.maxHand) {
      if (showMessage) {
        log('You cannot draw another card, your hand is full')
      }
      return false
    }
    return true
  }

  async drawAction() {
    if (!this.canDrawAction(true)) {
      return false
    }
    const a = pickRandom(arrayFromFrequencies(actions, 'name', actionFrequencies))
    const h = {
      id: nanoid(),
      name: a.name,
    }
    this.hand.push(h)
    await emit.call(this, 'onDrawAction', a)
    anime.set(`.card-${h.id}`, {
      translateY: 500,
    })
    await anime({
      targets: `.card-${h.id}`,
      keyframes: [
        { rotate: 45, scale: 2, translateX: random(-250, 250), translateY: 500 },
        { rotate: 0, scale: 1, translateX: 0, translateY: 0 },
      ],
      easing: 'cubicBezier(.5, .05, .1, .3)',
      duration: 500,
    }).finished
  }

  async onDrawAction(action) {}

  async destroyHandAction(id) {
    await anime({
      targets: `.card-${id}`,
      keyframes: [
        { rotate: random(25, 65), scale: 1, translateX: random(-250, 250), translateY: -500 },
      ],
      easing: 'cubicBezier(.5, .05, .1, .3)',
      duration: 500,
    }).finished

    const i = this.hand.findIndex(h => h.id === id)
    if (i !== -1) {
      this.hand.splice(i, 1)
    }
  }

  async destroySelected() {
    await Promise.all(this.selected.map(id => this.destroyHandAction(id)))
  }
}
