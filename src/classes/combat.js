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
    melee: false,
    ATK: 0,
    DEF: 3,
    AP: 2,
    FT: 0,
    mods: ['dex']
  },
  {
    name: 'roll',
    icon: '',
    label: 'Roll',
    color: '',
    defense: true,
    melee: false,
    ATK: 0,
    DEF: 3,
    AP: 3,
    FT: -6,
    mods: ['dex']
  },
  {
    name: 'cover',
    icon: '',
    label: 'Cover',
    color: '',
    defense: true,
    melee: false,
    ATK: 0,
    DEF: 5,
    AP: 3,
    FT: 0,
    mods: ['dex']
  },
  {
    name: 'deflect',
    icon: '',
    label: 'Deflect',
    color: '',
    defense: true,
    melee: false,
    ATK: 0,
    DEF: 8,
    AP: 4,
    FT: 0,
    mods: ['dex']
  },
  {
    name: 'deflect',
    icon: '',
    label: 'Deflect',
    color: '',
    defense: true,
    melee: false,
    ATK: 0,
    DEF: 8,
    AP: 4,
    FT: 0,
    mods: ['dex']
  },

  // Melee

  {
    name: 'slash',
    icon: '',
    label: 'Slash',
    color: '',
    defense: false,
    melee: true,
    ATK: 3,
    DEF: 0,
    AP: 2,
    FT: 0,
    mods: ['str']
  },
  {
    name: 'bash',
    icon: '',
    label: 'Bash',
    color: '',
    defense: false,
    melee: true,
    ATK: 5,
    DEF: 0,
    AP: 3,
    FT: 0,
    mods: ['str']
  },
  {
    name: 'charge',
    icon: '',
    label: 'Charge',
    color: '',
    defense: false,
    melee: true,
    ATK: 8,
    DEF: 0,
    AP: 4,
    FT: 0,
    mods: ['str']
  },
  {
    name: 'spin',
    icon: '',
    label: 'Spin',
    color: '',
    defense: false,
    melee: true,
    ATK: 10,
    DEF: 0,
    AP: 5,
    FT: 0,
    mods: ['str']
  },

  // Bare hands

  {
    name: 'punch',
    icon: '',
    label: 'Punch',
    color: '',
    defense: false,
    melee: true,
    ATK: 3,
    DEF: 0,
    AP: 2,
    FT: 0,
    mods: ['str']
  },
  {
    name: 'sucker',
    icon: '',
    label: 'Sucker Punch',
    color: '',
    defense: false,
    melee: true,
    ATK: 5,
    DEF: 0,
    AP: 3,
    FT: 0,
    mods: ['str']
  },
  {
    name: 'kick',
    icon: '',
    label: 'Kick',
    color: '',
    defense: false,
    melee: true,
    adversary: true,
    ATK: 1,
    DEF: 0,
    AP: 2,
    FT: 2,
    mods: ['str']
  },
  {
    name: 'push',
    icon: '',
    label: 'Push',
    color: '',
    defense: false,
    melee: true,
    adversary: true,
    ATK: 0,
    DEF: 0,
    AP: 1,
    FT: 2,
    mods: ['str']
  },

  // Ranged

  {
    name: 'shoot',
    icon: '',
    label: 'Shoot',
    color: '',
    defense: false,
    melee: false,
    ATK: 5,
    DEF: 0,
    AP: 2,
    FT: 0,
    mods: ['dex']
  },
  {
    name: 'kneel',
    icon: '',
    label: 'Kneel',
    color: '',
    defense: false,
    melee: false,
    ATK: 8,
    DEF: 0,
    AP: 3,
    FT: 0,
    mods: ['dex']
  },
  {
    name: 'trick',
    icon: '',
    label: 'Trickshot',
    color: '',
    defense: false,
    melee: false,
    ATK: 10,
    DEF: 0,
    AP: 4,
    FT: 0,
    mods: ['dex']
  },
  {
    name: 'reload',
    icon: '',
    label: 'Reload',
    color: '',
    defense: false,
    melee: false,
    ATK: 0,
    DEF: 0,
    AP: 3,
    FT: 0,
    mods: []
  },
  {
    name: 'unjam',
    icon: '',
    label: 'Unjam',
    color: '',
    defense: false,
    melee: false,
    ATK: 0,
    DEF: 0,
    AP: 4,
    FT: 0,
    mods: []
  },

  // Moves

  {
    name: 'advance',
    icon: '',
    label: 'Advance',
    color: '',
    defense: false,
    melee: false,
    ATK: 0,
    DEF: 0,
    AP: 1,
    FT: -2,
    mods: []
  },
  {
    name: 'charge',
    icon: '',
    label: 'Charge',
    color: '',
    defense: false,
    melee: false,
    ATK: 0,
    DEF: 0,
    AP: 3,
    FT: -6,
    mods: []
  },
  {
    name: 'retreat',
    icon: '',
    label: 'Retreat',
    color: '',
    defense: false,
    melee: false,
    ATK: 0,
    DEF: 0,
    AP: 1,
    FT: 2,
    mods: []
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
          AP: 0,
          ATK: 0,
          DEF: 0,
          FT: 0,
        },
      },
      him: {
        pos: random(10, 35),
        moves: [],
        stats: {
          AP: 0,
          ATK: 0,
          DEF: 0,
          FT: 0,
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

  get attack() {
    return 0
  }

  get defense() {
    return 0
  }

  get stateKey() { return this.isYourTurn ? 'you' : 'him' }

  get distance() { return this.you.pos + this.him.pos }

  canEndCombat(showMessage) {
    return true
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

  toggleCurrent() {
    if (this.isYourTurn) {
      this.current = HIM
    } else {
      this.current = YOU
    }
  }

  clearMoves() {
    this[this.stateKey].moves = []
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

  async advance(distance) {
    if (!this.canAdvance(distance, true)) {
      return false
    }
    const key = this.stateKey
    const min = store.config.minDistance
    let x = distance
    while (this.distance > min && x > 0) {
      this[key].pos -= 1
      x -= 1
    }
    return true
  }

  canRetreat(distance, showMessage) {
    if (this.distance >= store.config.maxDistance) {
      if (showMessage) {
        log('You cannot retreat further')
      }
      return false
    }
    return true
  }

  async retreat(distance) {
    if (!this.canRetreat(distance, true)) {
      return false
    }
    const key = this.stateKey
    const max = store.config.maxDistance
    let x = distance
    while (this.distance < max && x > 0) {
      this[key].pos += 1
      x -= 1
    }
    return true
  }

  async ai() {

  }

  async win() {
    this.won = true
    await emit.call(this, 'onWin')
    return this.endCombat()
  }

  async onWin() {}

  async lose() {
    this.won = false
    await emit.call(this, 'onLose')
    return this.endCombat()
  }

  async onLose() {}
}
