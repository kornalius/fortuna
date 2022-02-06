import Item from './item'
import { log, mixin, oppositeDirection } from '@/utils'
import { store } from '@/store'
import Openable from '@/mixins/openable'
import Lockable from '@/mixins/lockable'

export default class Door extends Item {
  setupInstance(data) {
    let keyId

    if (data.key) {
      keyId = data.key.id
    }

    return super.setupInstance({
      name: 'Door',
      directions: {},
      actions: [
        door => (
          door.isOpened
            ? {
              label: 'Enter',
              key: 'enter',
              icon: 'whh:enteralt',
              disabled: false,
              click: () => door.enter(),
            }
            : undefined
        ),
      ],
      actionsOrder: [
        'enter',
        'toggleOpen',
        'unlock',
      ],
      keyId,
      ...data,
      key: undefined,
    })
  }

  get directions() { return this.state.directions }
  get direction() { return this.directions[store.game.room.id] }

  get roomIds() { return Object.keys(this.directions) }
  get rooms() { return this.roomIds.map(id => store.rooms.get(id)) }

  roomForDirection (d) {
    const od = oppositeDirection(d)
    return this.roomIds.find(id => this.directions[id] === od)
  }

  enter() {
    if (!this.isOpened) {
      return log('The door is not opened')
    }

    const room = this.roomForDirection(this.direction)
    if (room) {
      room.enter()
    }
  }
}

mixin(Door, [Openable, Lockable])
