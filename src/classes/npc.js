import Entity from '../entity'
import { emit, log, mixin } from '@/utils'
import { store } from '@/store'
import Dialog from '@/classes/dialog'
import Combat from '@/classes/combat'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Actions from '@/mixins/actions'
import Image from '@/mixins/image'
import Hovered from '@/mixins/hovered'
import Location from '@/mixins/location'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Items from '@/mixins/items'
import Carry from '@/mixins/carry'

export default class Npc extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Npc',
      hp: this.maxHp,
      str: store.config.baseStr,
      dex: store.config.baseDex,
      int: store.config.baseInt,
      ap: this.maxAp,
      talkable: false,
      known: false,
      aggresive: false,
      locationId,
      locationStore,
      actions: [
        item => (
          item.canTalk()
            ? {
              label: 'Talk',
              key: 'talk',
              icon: 'vs:kakaotalk',
              click: async () => item.talk(),
            }
            : undefined
        ),
        item => (
          item.canCombat()
            ? {
              label: 'Combat',
              key: 'combat',
              icon: 'mdi:axe-battle',
              click: async () => item.combat(),
            }
            : undefined
        ),
      ],
      ...data,
    })
  }

  get name() { return this.isKnown ? this.state.name : '???' }

  get str() { return this.state.str }
  set str(value) { this.state.str = value }

  get dex() { return this.state.dex }
  set dex(value) { this.state.dex = value }

  get int() { return this.state.int }
  set int(value) { this.state.int = value }

  get ap() { return this.state.ap }
  set ap(value) { this.state.ap = Math.max(0, Math.min(value, this.maxAp)) }
  get maxAp() { return Math.ceil(store.config.baseAp + (0.25 * this.lvl)) }

  get isKnown() { return this.state.known }
  set known(value) { this.state.known = value }

  get items() { return store.items.list.filter(i => i.location === this) }

  get equippedItems() { return this.items.filter(i => i.isEquipped) }

  get equippedWeapons() { return this.equippedItems.filter(i => i.isWeapon) }
  get equippedArmors() { return this.equippedItems.filter(i => i.isArmor) }

  get dialogs() { return store.dialogs.list.filter(d => d.npc === this) }

  get isTalkable() { return this.state.talkable }
  set talkable(value) { this.state.talkable = value }

  get isAggresive() { return this.state.aggresive }
  set aggresive(value) { this.state.aggresive = value }

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
    if (store.player.isInDialog && store.player.dialog.npc !== this) {
      if (showMessage) {
        log(`You are already in discussion with ${this.name}`)
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log(`You are already in combat with ${store.player.combat.npc.name}`)
      }
      return false
    }
    if (store.player.isConnectedToServer) {
      if (showMessage) {
        log(`Disconnect from ${store.player.server.toLowerCase()} first`)
      }
      return false
    }
    return true
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
}

mixin(Npc, [
  Name,
  Description,
  Actions,
  Image,
  Hovered,
  Location,
  Items,
  Level,
  Buffable,
  Hp,
  Carry,
])
