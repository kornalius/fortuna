import Item from './item'
import { can, emit, mixin, oppositeDirection, registerClass } from '@/utils'
import { store } from '@/store'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Openable from '@/mixins/openable'
import Unlockable from '@/mixins/unlockable'

export default class Door extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Door',
      keyId: data?.key?.id,
      usable: true,
      pickable: false,
      dropable: false,
      directions: {},
      actions: [
        item => (
          {
            label: item.useLabel,
            key: 'use',
            icon: 'enter',
            disabled: !item.canUse(),
            click: async () => item.use(),
          }
        ),
      ],
      actionsOrder: [
        'use',
        'toggleOpen',
        'unlock',
      ],
      ...data,
    })
  }

  get directions() { return this.state.directions }
  get direction() { return this.directions[store.game.room.id] }

  get roomIds() { return Object.keys(this.directions) }
  get rooms() { return this.roomIds.map(id => store.rooms.get(id)) }

  get useLabel() {
    return `Enter ${this.requirementsLabelFor('use')}`
  }

  roomForDirection (d) {
    const od = oppositeDirection(d)
    const id = this.roomIds.find(id => this.directions[id] === od)
    return store.rooms.get(id)
  }

  canUse(showMessage) {
    return can(this, [
      {
        expr: () => !this.isOpened,
        log: () => 'The door is not opened'
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot enter this door while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot enter this door while in conversation'
      },
      {
        expr: () => this.isLocked,
        log: () => `${this.name} is locked`
      },
      {
        expr: () => !store.game.room.canExit(showMessage),
      }
    ], showMessage)
  }

  async use() {
    if (!this.canUse(true)) {
      return false
    }
    const room = this.roomForDirection(this.direction)
    if (room && room.canEnter(true)) {
      await room.enter()
      await emit.call(this, 'onUse')
    }
    return false
  }

  async onOpen() {
    store.game.playSound('open-door')
  }

  async onClose() {
    store.game.playSound('close-door')
  }
}

mixin(Door, [
  Name,
  Description,
  Openable,
  Unlockable,
])

registerClass(Door)
