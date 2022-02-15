import random from 'lodash/random'
import Entity from '../entity'
import { store } from '@/store'
import { emit, log } from '@/utils'

export const moves = [
  // Defensive

  {
    name: 'dodge',
    icon: '',
    label: 'Dodge',
    color: '',
    defense: true,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 3,
    ap: 2,
    ft: 0,
    mods: ['dex'],
  },
  {
    name: 'roll',
    icon: '',
    label: 'Roll',
    color: '',
    defense: true,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 3,
    ap: 3,
    ft: -6,
    mods: ['dex'],
  },
  {
    name: 'cover',
    icon: '',
    label: 'Cover',
    color: '',
    defense: true,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 5,
    ap: 3,
    ft: 0,
    mods: ['dex'],
  },
  {
    name: 'deflect',
    icon: '',
    label: 'Deflect',
    color: '',
    defense: true,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 8,
    ap: 4,
    ft: 0,
    mods: ['dex'],
  },
  {
    name: 'deflect',
    icon: '',
    label: 'Deflect',
    color: '',
    defense: true,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 8,
    ap: 4,
    ft: 0,
    mods: ['dex'],
  },

  // Melee

  {
    name: 'slash',
    icon: '',
    label: 'Slash',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 3,
    def: 0,
    ap: 2,
    ft: 0,
    mods: ['str'],
  },
  {
    name: 'bash',
    icon: '',
    label: 'Bash',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 5,
    def: 0,
    ap: 3,
    ft: 0,
    mods: ['str'],
  },
  {
    name: 'charge',
    icon: '',
    label: 'Charge',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 8,
    def: 0,
    ap: 4,
    ft: 0,
    mods: ['str'],
  },
  {
    name: 'spin',
    icon: '',
    label: 'Spin',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 10,
    def: 0,
    ap: 5,
    ft: 0,
    mods: ['str'],
  },

  // Bare hands

  {
    name: 'punch',
    icon: '',
    label: 'Punch',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 3,
    def: 0,
    ap: 2,
    ft: 0,
    mods: ['str'],
  },
  {
    name: 'sucker',
    icon: '',
    label: 'Sucker Punch',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 5,
    def: 0,
    ap: 3,
    ft: 0,
    mods: ['str'],
  },
  {
    name: 'kick',
    icon: '',
    label: 'Kick',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 1,
    def: 0,
    ap: 2,
    ft: 2,
    mods: ['str'],
  },
  {
    name: 'push',
    icon: '',
    label: 'Push',
    color: '',
    defense: false,
    offense: true,
    melee: true,
    move: false,
    atk: 0,
    def: 0,
    ap: 1,
    ft: 2,
    mods: ['str'],
  },

  // Ranged

  {
    name: 'shoot',
    icon: '',
    label: 'Shoot',
    color: '',
    defense: false,
    offense: true,
    melee: false,
    move: false,
    atk: 5,
    def: 0,
    ap: 2,
    ft: 0,
    mods: ['dex'],
  },
  {
    name: 'kneel',
    icon: '',
    label: 'Kneel',
    color: '',
    defense: false,
    offense: true,
    melee: false,
    move: false,
    atk: 8,
    def: 0,
    ap: 3,
    ft: 0,
    mods: ['dex'],
  },
  {
    name: 'trick',
    icon: '',
    label: 'Trickshot',
    color: '',
    defense: false,
    offense: true,
    melee: false,
    move: false,
    atk: 10,
    def: 0,
    ap: 4,
    ft: 0,
    mods: ['dex'],
  },
  {
    name: 'reload',
    icon: '',
    label: 'Reload',
    color: '',
    defense: false,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 0,
    ap: 3,
    ft: 0,
    mods: [],
  },
  {
    name: 'unjam',
    icon: '',
    label: 'Unjam',
    color: '',
    defense: false,
    offense: false,
    melee: false,
    move: false,
    atk: 0,
    def: 0,
    ap: 4,
    ft: 0,
    mods: [],
  },

  // Moves

  {
    name: 'advance',
    icon: '',
    label: 'Advance',
    color: '',
    defense: false,
    offense: false,
    melee: false,
    move: true,
    atk: 0,
    def: 0,
    ap: 1,
    ft: -2,
    mods: [],
  },
  {
    name: 'back',
    icon: '',
    label: 'Move back',
    color: '',
    defense: false,
    offense: false,
    melee: false,
    move: true,
    atk: 0,
    def: 0,
    ap: 1,
    ft: -2,
    mods: [],
  },
  {
    name: 'charge',
    icon: '',
    label: 'Charge',
    color: '',
    defense: false,
    offense: false,
    melee: false,
    move: true,
    atk: 0,
    def: 0,
    ap: 3,
    ft: -6,
    mods: []
  },
  {
    name: 'retreat',
    icon: '',
    label: 'Retreat',
    color: '',
    defense: false,
    offense: false,
    melee: false,
    move: true,
    atk: 0,
    def: 0,
    ap: 1,
    ft: 2,
    mods: [],
    fn: 'retreat',
  },
]

const YOU = 1
const HIM = 2

export default class Combat extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      npcId: null,
      you: {
        pos: random(10, 35),
        moves: [],
        stats: {
          ap: 0,
          atk: 0,
          def: 0,
          ft: 0,
          retreat: false,
        },
      },
      him: {
        pos: random(10, 35),
        moves: [],
        stats: {
          ap: 0,
          atk: 0,
          def: 0,
          ft: 0,
          retreat: false,
        },
      },
      // current active player 1: YOU, 2: HIM
      current: YOU,
      // current turn
      turn: 1,
      // has the combat ended
      ended: false,
      // did you win the battle?
      won: false,
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

  get you() { return this.state.you }
  set you(value) { this.state.you = value }

  get him() { return this.state.him }
  set him(value) { this.state.him = value }

  get current() { return this.state.current }
  set current(value) { this.state.current = value }

  get isYourTurn() { return this.current === YOU }
  get isHisTurn() { return this.current === HIM }

  get defensiveMoves() { return moves.filter(m => m.defense) }
  get offensiveMoves() { return moves.filter(m => m.offense) }
  get rangedMoves() { return moves.filter(m => m.offense && m.melee === false) }
  get meleeMoves() { return moves.filter(m => m.offense && m.melee) }
  get displacementMoves() { return moves.filter(m => m.move) }
  get pushMoves() { return moves.filter(m => m.name === 'push' || m.name === 'kick') }

  get distance() { return this.you.pos + this.him.pos }

  getMove(name) { return moves.find(m => m.name === name) }

  isDefensiveMove(name) { return this.defensiveMoves.includes(this.getMove(name)) }
  isOffensiveMove(name) { return this.offensiveMoves.includes(this.getMove(name)) }
  isRangedMove(name) { return this.rangedMoves.includes(this.getMove(name)) }
  isMeleeMove(name) { return this.meleeMoves.includes(this.getMove(name)) }
  isDisplacementMove(name) { return this.displacementMoves.includes(this.getMove(name)) }
  isPushMove(name) { return this.pushMoves.includes(this.getMove(name)) }

  get isInMeleeRange() { return this.distance <= 1 }

  get attackerStateKey() { return this.isYourTurn ? 'you' : 'him' }
  get defenderStateKey() { return this.isYourTurn ? 'him' : 'you' }
  get attackerState() { return this[this.attackerStateKey] }
  get defenderState() { return this[this.defenderStateKey] }

  get currentInstance() { return this.isYourTurn ? store.player : this.npc }
  get attackerInstance() { return this.isYourTurn ? store.player : this.npc }
  get defenderInstance() { return !this.isYourTurn ? store.player : this.npc }
  get weapon() { return this.isInMeleeRange ? this.currentInstance.meleeWeapon : this.currentInstance.rangeWeapon }
  get armors() { return this.currentInstance.equippedArmors }
  get armorsDef() { return this.armors.reduce((acc, a) => acc + a.def, 0) }
  get movesDef() { return this.attackerState.moves.reduce((acc, a) => acc + a.def, 0) }
  get lvl() { return this.currentInstance.lvl }
  get hp() { return this.currentInstance.hp }
  get str() { return this.currentInstance.str }
  get dex() { return this.currentInstance.dex }
  get int() { return this.currentInstance.int }
  get ap() { return this.currentInstance.ap }

  toggleCurrent() {
    if (this.isYourTurn) {
      this.current = HIM
    } else {
      this.current = YOU
    }
  }

  clearMoves() {
    this[this.attackerStateKey].moves = []
  }

  async nextTurn() {
    this.turn += 1
    this.toggleCurrent()
    this.clearMoves()
    await emit.call(this, 'onTurn')
    if (this.isHisTurn) {
      await this.ai()
    }
  }

  async onTurn() {}

  canAdvance(distance, showMessage) {
    if (this.distance <= store.config.minDistance) {
      if (showMessage) {
        log('You cannot advance anymore')
      }
      return false
    }
    return true
  }

  async advance(distance, state = this.attackerState) {
    if (!this.canAdvance(distance, true)) {
      return false
    }
    const min = store.config.minDistance
    let x = distance
    while (this.distance > min && x > 0) {
      state.pos -= 1
      x -= 1
    }
    await emit.call(this, 'onAdvance')
    return true
  }

  async onAdvance() {}

  canMoveBack(distance, showMessage) {
    if (this.distance >= store.config.maxDistance) {
      if (showMessage) {
        log('You cannot move further back')
      }
      return false
    }
    return true
  }

  async moveBack(distance, state = this.attackerState) {
    if (!this.canMoveBack(distance, true)) {
      return false
    }
    const max = store.config.maxDistance
    let x = distance
    while (this.distance < max && x > 0) {
      state.pos += 1
      x -= 1
    }
    await emit.call(this, 'onMoveBack')
    return true
  }

  async onMoveBack() {}

  async ai() {

  }

  canRetreat(showMessage) {
    if (this.distance < store.config.maxDistance) {
      if (showMessage) {
        log('You are not far enough to retreat')
      }
      return false
    }
    return true
  }

  async retreat() {
    if (!this.canRetreat(true)) {
      return false
    }
    this.attackerState.retreat = true
    log(`${this.attackerInstance.name} has retreated from the battle`)
    await emit.call(this, 'onRetreat')
    return true
  }

  async onRetreat() {}

  canEndCombat(showMessage) {
    return store.player.hp <= 0
      || this.npc.hp <= 0
      || this.you.retreat
      || this.him.retreat
  }

  async endCombat() {
    if (!this.canEndCombat(true)) {
      return false
    }

    this.ended = true
    store.player.combat = null

    await emit.call(this, 'onEndCombat')

    if (store.player.hp <= 0) {
      await this.lose()
    } else if (this.npc.hp <= 0) {
      await this.win()
    }

    return true
  }

  async onEndCombat() {}

  async win() {
    this.won = true
    log('You have won the battle')
    await emit.call(this, 'onWin')
  }

  async onWin() {}

  async lose() {
    this.won = false
    log('You have lost the battle')
    await emit.call(this, 'onLose')
  }

  async onLose() {}

  /**
   * Calculate the attack score for a move
   *
   * @param name
   * @returns {number|*}
   */
  attack(name) {
    const m = this.getMove(name)
    if (m) {
      const mods = m.mods.reduce((acc, m) => acc + this[m], 0)
      const a = mods + m.atk + this.weapon.atk
      return a + random(a)
    }
    return 0
  }

  /**
   * Calculate the defence score for a move
   *
   * @param name
   * @returns {number|*}
   */
  defense(name) {
    const m = this.getMove(name)
    if (m) {
      const mods = m.mods.reduce((acc, m) => acc + this[m], 0)
      const d = mods + m.def + this.armorsDef + this.movesDef
      return d + random(d)
    }
    return 0
  }

  /**
   * Can we add the defensive move to the queue
   *
   * @param name
   * @param showMessage
   * @returns {boolean}
   */
  canAddMove(name, showMessage) {
    const m = this.getMove(name)
    if (!m) {
      if (showMessage) {
        log(`${name} is an invalid move name`)
      }
      return false
    }
    // already in your current defensive moves
    if (this.attackerState.moves.includes(name)) {
      if (showMessage) {
        log(`Defensive move ${m.label.toLowerCase()} is already queue`)
      }
      return false
    }
    // if it's not a defensive move
    if (!m.defense) {
      if (showMessage) {
        log(`${m.label} is not a defensive move`)
      }
      return false
    }
    // is there enough action points left to execute this move
    if (!this.isYourTurn ? this.you.ap - m.ap < 0 : this.him.ap - m.ap < 0) {
      if (showMessage) {
        log(`Not enough action points to use ${m.label.toLowerCase()}`)
      }
      return false
    }
    return true
  }

  async applyMoveDisplacements(name, state = this.attackerState) {
    const m = this.getMove(name)
    if (m.ft < 0) {
      await this.moveBack(Math.abs(m.ft), state)
      return true
    } else if (m.ft > 0) {
      await this.advance(m.ft, state)
      return true
    }
    return false
  }

  /**
   * Add a defensive move for the next turn
   *
   * @param name
   * @returns {Promise<void>}
   */
  async addMove(name) {
    if (!this.canAddMove(name, true)) {
      return false
    }
    const m = this.getMove(name)
    this.attackerState.moves.push(name)
    this.attackerState.ap -= m.ap
    await this.applyMoveDisplacements(name)
    return true
  }

  canExecuteMove(name, showMessage) {
    const m = this.getMove(name)
    if (!m) {
      if (showMessage) {
        log(`${name} is an invalid move name`)
      }
      return false
    }
    // if it's not a offensive move
    if (m.defense) {
      if (showMessage) {
        log(`${m.label} is not a offensive move`)
      }
      return false
    }
    // can only use range attack in range mode
    if (m.melee && !this.isInMeleeRange) {
      if (showMessage) {
        log(`${m.label} is a melee move, you need to use a range move`)
      }
      return false
    }
    // can only use melee attack in melee mode
    if (!m.melee && this.isInMeleeRange) {
      if (showMessage) {
        log(`${m.label} is a range move, you need to use a melee move`)
      }
      return false
    }
    // is there enough action points left to execute this move
    if (this.isYourTurn ? this.you.ap - m.ap < 0 : this.him.ap - m.ap < 0) {
      if (showMessage) {
        log(`Not enough action points to use ${m.label.toLowerCase()}`)
      }
      return false
    }
    return true
  }

  /**
   * Execute an offensive move
   *
   * @param name
   * @returns {Promise<boolean|void>}
   */
  async executeMove(name) {
    if (this.isDefensiveMove(name)) {
      return this.addMove(name)
    }

    if (!this.canExecuteMove(name, true)) {
      return false
    }

    const m = this.getMove(name)

    if (typeof m.fn === 'function') {
      if (!this[m.fn]()) {
        return false
      }
    }

    this.attackerState.ap -= m.ap

    await this.applyMoveDisplacements(name, this.defenderState)

    if (m.offense) {
      const atk = this.attack(name)
      const def = this.defense(name)
      const dmg = atk > def

      log(`${this.attackerInstance.name} attacks ${this.defenderInstance.name} for ${dmg} damages`)

      if (dmg > 0) {
        await this.damage(dmg)
      } else {
        await this.block(Math.abs(dmg))
      }

      // this will check first if it needs to end the combat
      await this.endCombat()
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
    const opponent = this.defenderInstance
    opponent.hp -= dmg
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
}
