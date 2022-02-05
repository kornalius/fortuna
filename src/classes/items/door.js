import Item from './item'
import { mixin } from '@/utils'
import { store } from '@/store'
import Openable from '@/mixins/openable'
import Lockable from '@/mixins/lockable'

export default class Door extends Item {
  setupInstance(data) {
    let keyId

    if (data.key) {
      keyId = data.key.id
    }

    return {
      name: 'Door',
      locked: false,
      directions: {},
      keyId,
      ...data,
      key: undefined,
    }
  }

  get directions() { return this.state.directions }

  get roomIds() { return Object.keys(this.directions) }
  get rooms() { return this.roomIds.map(id => store.rooms.get(id)) }

}

mixin(Door, [Openable, Lockable])
