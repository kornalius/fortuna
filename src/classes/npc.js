import Entity from '../entity'
import { emit, log, mixin } from '@/utils'
import { store } from '@/store'
import Dialog from '@/classes/dialog'
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
      talkable: false,
      known: false,
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
      ],
      ...data,
    })
  }

  get name() { return this.isKnown ? this.state.name : '???' }

  get isKnown() { return this.state.known }
  set known(value) { this.state.known = value }

  get items() { return store.items.list.filter(i => i.location === this) }

  get dialogs() { return store.dialogs.list.filter(d => d.npc === this) }

  get isTalkable() { return this.state.talkable }
  set talkable(value) { this.state.talkable = value }

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

  async onTalk() { }

  canSay(code) {
    return !!this.getDialog(code)
  }

  async say(code) {
    if (!this.canSay(code)) {
      return false
    }
    const dialog = this.getDialog(code)
    if (dialog) {
      return dialog.say()
    }
    return false
  }

  async onSay(dialog) { }

  async onAnswer(dialog, code) { }

  async onBye() { }
}

mixin(Npc, [Name, Description, Actions, Image, Hovered, Location, Items, Level, Buffable, Hp, Carry])
