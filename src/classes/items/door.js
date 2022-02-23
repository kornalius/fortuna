import Item from './item'
import { emit, log, mixin, oppositeDirection } from '@/utils'
import { store } from '@/store'
import Openable from '@/mixins/openable'
import Unlockable from '@/mixins/unlockable'

export default class Door extends Item {
  setupInstance(data) {
    let keyId

    if (data.key) {
      keyId = data.key.id
    }

    return super.setupInstance({
      name: 'Door',
      keyId,
      usable: true,
      pickable: false,
      dropable: false,
      directions: {},
      actions: [
        item => (
          {
            label: item.useLabel,
            key: 'use',
            icon: 'whh:enteralt',
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
    if (!this.isOpened) {
      if (showMessage) {
        log('The door is not opened')
      }
      return false
    }
    if (this.isLocked) {
      if (showMessage) {
        log(`${this.name} is locked`)
      }
      return false
    }
    return store.game.room.canExit(showMessage);
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
}

mixin(Door, [
  Openable,
  Unlockable,
])
