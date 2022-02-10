import Item from './item'
import { log, mixin, oppositeDirection } from '@/utils'
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
      directions: {},
      actions: [
        item => (
          item.canEnter()
            ? {
              label: 'Enter',
              key: 'enter',
              icon: 'whh:enteralt',
              disabled: false,
              click: async () => item.enter(),
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
      usable: false,
      pickable: false,
      dropable: false,
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
    const id = this.roomIds.find(id => this.directions[id] === od)
    return store.rooms.get(id)
  }

  canEnter(showMessage) {
    if (!this.isOpened) {
      if (showMessage) {
        log('The door is not opened')
      }
      return false
    }
    return true
  }

  async enter() {
    if (!this.canEnter(true)) {
      return false
    }

    const room = this.roomForDirection(this.direction)
    if (room) {
      room.enter()
      return true
    }
    return false
  }
}

mixin(Door, [Openable, Unlockable])
