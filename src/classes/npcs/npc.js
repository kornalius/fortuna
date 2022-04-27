import Entity from '@/entity'
import Dialog from '@/classes/dialog'
import Combat from '@/classes/combat'
import { can, emit, mixin, registerClass } from '@/utils'
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
import Sleep from '@/mixins/sleep'
import Tooltip from '@/mixins/tooltip'

export default class Npc extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Npc',
      hp: this.maxHp,
      talkable: false,
      known: false,
      aggresive: false,
      female: false,
      locationId,
      locationStore,
      dice: this.baseDice,
      // fixed set of dice
      actions: [
        item => (
          {
            label: 'Talk',
            key: 'talk',
            icon: 'talk',
            disabled: !item.canTalk(),
            click: async () => item.talk(),
          }
        ),
        item => (
          {
            label: 'Combat',
            key: 'combat',
            icon: 'combat',
            disabled: !item.canCombat(),
            click: async () => item.combat(),
          }
        ),
      ],
      // Agenda to follow
      // { start: '08:00', end: '16:00', roomId: 'id', expr: (npc, end?) => void },
      // { start: '16:01', end: '07:59', roomCode: 'Home', expr: (npc, end?) => void },
      // { date: '2157-03-01', start: '14:00', end: '20:00', roomCode: 'SpecialRoom', expr: (npc, end?) => void },
      agenda: [],
      // turns to skip during battle
      skipTurns: 0,
      ...data,
    })
  }

  get isNpc() { return true }

  get name() { return this.isKnown ? this.state.name : '???' }
  get description() { return this.isKnown ? this.state.description : '???' }

  get female() { return this.state.female }
  set female(value) { this.state.female = value }

  get iconSuffix() {
    return `${this.state.iconSuffix ? `${this.state.iconSuffix}-` : ''}${this.female ? 'female' : 'male'}`
  }

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

  get dice() {
    const diff = this.state.dice.length - this.maxDice
    if (diff > 0) {
      this.state.dice = [
        ...(this.state.dice || []),
        ...store.config.randomDice(diff, store.config.npcBattleDice, ['_']),
      ]
    }
    if (diff < 0) {
      let x = diff
      while (x < 0) {
        this.state.dice.pop()
        x += 1
      }
    }
    return this.state.dice
  }
  set dice(value) { this.state.dice = value }

  get maxDice() { return Math.floor(store.config.baseDice + (0.25 * this.lvl)) }

  get skipTurns() { return this.state.skipTurns }
  set skipTurns(value) { this.state.skipTurns = value }

  get baseDice() {
    const { npcBattleDice } = store.config
    const atkIndex = npcBattleDice.find(d => d.value === 'A') + 1
    const dice = store.config.randomDice(this.maxDice - 1, npcBattleDice, ['_'])
    // make sure has at least on ATTACK die
    dice.push({ faces: npcBattleDice, value: atkIndex })
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
      store.dialogs.update(i)
      i.setupAnswers()
      return i
    }
  }

  canTalk(showMessage) {
    return can(this, [
      {
        expr: () => !this.isTalkable,
        log: () => `${this.name} is not interested in talking to you`
      },
      { expr: () => store.player.isInDialog,
        log: () => `You are already in discussion with ${this.name}`
      },
      { expr: () => store.player.isInCombat,
        log: () => `You cannot talk to ${this.name} while in combat with ${store.player.combat.npc.name}`
      },
      { expr: () => store.player.isConnectedToServer,
        log: () => `Disconnect from ${store.player.server.toLowerCase()} first`
      },
    ], showMessage, 'talk')
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
    return can(this, [
      {
        expr: () => !this.getDialog(code),
        log: () => `Could not find a valid dialog entry with the code ${code}`
      },
    ], showMessage)
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
    return can(this, [
      {
        expr: () => store.player.isInDialog,
        log: () => `You are already in discussion with ${store.player.dialog.npc.name}`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => `You are already in combat with ${store.player.combat.npc.name}`
      },
      {
        expr: () => !this.isAggresive,
        log: () => `${this.name} is not aggresive towards you, there are no reasons for conflict`
      },
      {
        expr: () => this.isDead,
        log: () => `${this.name} is dead, you cannot fight`
      },
    ], showMessage)
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
    return can(this, [
      {
        expr: () => this.isSleeping,
        log: () => `${this.name} is sleeping, therefore cannot move`
      },
      {
        expr: () => store.player.isInCombat && store.player.combat.npc === this,
        log: () => `${this.name} cannot move while in combat`
      },
      {
        expr: () => store.player.isInDialog && store.player.dialog.npc === this,
        log: () => `${this.name} cannot move while in discussion`
      },
    ], showMessage)
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
  Sleep,
  Tooltip,
])

registerClass(Npc)
