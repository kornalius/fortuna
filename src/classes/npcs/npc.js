import random from 'lodash/random'
import Entity from '@/entity'
import Dialog from '@/classes/dialog'
import Combat from '@/classes/combat'
import { emit, log, mixin, registerClass } from '@/utils'
import { store } from '@/store'
import Code from '@/mixins/code'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Actions from '@/mixins/actions'
import Image from '@/mixins/image'
import Hovered from '@/mixins/hovered'
import Location from '@/mixins/location'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Credits from '@/mixins/credits'
import Items from '@/mixins/items'
import Carry from '@/mixins/carry'
import Requirements from '@/mixins/requirements'

export default class Npc extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Npc',
      hp: this.maxHp,
      talkable: false,
      known: false,
      aggresive: false,
      locationId,
      locationStore,
      dice: this.baseDice,
      // fixed set of dice
      battleDice: [],
      actions: [
        item => (
          {
            label: 'Talk',
            key: 'talk',
            icon: 'vs:kakaotalk',
            disabled: !item.canTalk(),
            click: async () => item.talk(),
          }
        ),
        item => (
          {
            label: 'Combat',
            key: 'combat',
            icon: 'mdi:axe-battle',
            disabled: !item.canCombat(),
            click: async () => item.combat(),
          }
        ),
      ],
      // Agenda to follow
      // { start: '08:00', end: '16:00', roomId: 'id' },
      // { start: '16:01', end: '07:59', roomCode: 'Home' },
      // { date: '2157-03-01', start: '14:00', end: '20:00', roomCode: 'SpecialRoom' },
      agenda: [],
      // turns to skip during battle
      skipTurns: 0,
      ...data,
    })
  }

  get name() { return this.isKnown ? this.state.name : '???' }

  get maxHp() {
    return Math.floor(
      (this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl) * 0.5
    )
  }

  get isKnown() { return this.state.known }
  set known(value) { this.state.known = value }

  get items() { return store.items.list.filter(i => i.location === this) }

  get dialogs() { return store.dialogs.list.filter(d => d.npc === this) }

  get isTalkable() { return this.state.talkable }
  set talkable(value) { this.state.talkable = value }

  get isAggresive() { return this.state.aggresive }
  set aggresive(value) { this.state.aggresive = value }

  get dice() { return this.state.dice }
  set dice(value) { this.state.dice = value }
  get maxDice() { return Math.floor(store.config.baseDice + (0.25 * this.lvl)) }

  get battleDice() { return this.state.battleDice }
  set battleDice(value) { this.state.battleDice = value }

  get skipTurns() { return this.state.skipTurns }
  set skipTurns(value) { this.state.skipTurns = value }

  get baseDice() {
    if (this.battleDice && this.battleDice.length) {
      const dice = [...this.battleDice]
        .filter(d => store.config.npcBattleDice[d.value - 1].value !== '_')
      return dice.sort((a, b) => (
        a.value < b.value ? -1 : 1
      ))
    }
    const dice = new Array(this.maxDice - 1).fill(0)
      .map(() => ({ faces: store.config.npcBattleDice, value: random(1, 6) }))
      .filter(d => store.config.npcBattleDice[d.value - 1].value !== '_')
    dice.push({ faces: store.config.npcBattleDice, value: 1 })
    return dice.sort((a, b) => (
      a.value < b.value ? -1 : 1
    ))
  }

  get swordDice() {
    return this.dice.filter(d => store.config.npcBattleDice[d.value - 1].value === 'A')
  }
  get swordDiceIndexes() {
    return this.swordDice.map(d => this.dice.indexOf(d))
  }

  get shieldDice() {
    return this.dice.filter(d => store.config.npcBattleDice[d.value - 1].value === 'D')
  }
  get shieldDiceIndexes() {
    return this.shieldDice.map(d => this.dice.indexOf(d))
  }

  get agenda() { return this.state.agenda }
  set agenda(value) { this.state.agenda = value }

  getDialog(code) { return this.dialogs.find(d => d.code === code) }

  async startingDialog() { return this.getDialog('start') }

  addDialog(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addDialog(d))
    }

    if (data instanceof Dialog) {
      data.npc = this
      store.dialogs.update(data)
      data.setupAnswers()
      return data
    } else {
      const i = new Dialog(data)
      i.npc = this
      i.setupAnswers()
      store.dialogs.update(i)
      return i
    }
  }

  canTalk(showMessage) {
    if (!this.isTalkable) {
      if (showMessage) {
        log(`${this.name} is not interested in talking to you`)
      }
      return false
    }
    if (store.player.isInDialog) {
      if (showMessage) {
        log(`You are already in discussion with ${this.name}`)
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log(`You cannot talk to ${this.name} while in combat with ${store.player.combat.npc.name}`)
      }
      return false
    }
    if (store.player.isConnectedToServer) {
      if (showMessage) {
        log(`Disconnect from ${store.player.server.toLowerCase()} first`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('talk', showMessage));
  }

  async talk() {
    if (!this.canTalk(true)) {
      return false
    }
    store.player.dialog = await this.startingDialog()
    await emit.call(this, 'onTalk')
    return true
  }

  async onTalk() {}

  canSay(code, showMessage) {
    if (!this.getDialog(code)) {
      if (showMessage) {
        log(`Could not find a valid dialog entry with the code ${code}`)
      }
      return false
    }
    return true
  }

  async say(code) {
    if (!this.canSay(code, true)) {
      return false
    }
    const dialog = this.getDialog(code)
    return dialog.say()
  }

  async onSay(dialog) {}

  async onAnswer(dialog, code) {}

  async onBye() {}

  canCombat(showMessage) {
    if (store.player.isInDialog) {
      if (showMessage) {
        log(`You are already in discussion with ${store.player.dialog.npc.name}`)
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log(`You are already in combat with ${store.player.combat.npc.name}`)
      }
      return false
    }
    if (!this.isAggresive) {
      if (showMessage) {
        log(`${this.name} is not aggresive towards you, there are no reasons for conflict`)
      }
      return false
    }
    if (this.isDead) {
      if (showMessage) {
        log(`${this.name} is dead, you cannot fight`)
      }
      return false
    }
    return true
  }

  async combat() {
    if (!this.canCombat(true)) {
      return false
    }
    store.player.combat = store.combats.update(new Combat({
      npcId: this.id,
    }))
    if (await store.player.combat.startCombat()) {
    } else {
      store.player.combat.remove()
      store.player.combat = null
    }
    return true
  }

  canMove(showMessage) {
    if (store.player.isInCombat && store.player.combat.npc === this) {
      if (showMessage) {
        log(`${this.name} cannot move while in combat`)
      }
      return false
    }
    if (store.player.isInDialog && store.player.dialog.npc === this) {
      if (showMessage) {
        log(`${this.name} cannot move while in discussion`)
      }
      return false
    }
    return true
  }
}

mixin(Npc, [
  Code,
  Name,
  Description,
  Actions,
  Image,
  Hovered,
  Location,
  Credits,
  Items,
  Level,
  Buffable,
  Hp,
  Carry,
  Requirements,
])

registerClass(Npc)
