import Entity from '@/entity'
import { mixin, emit, log } from '@/utils'
import { store } from '@/store'
import Door from '@/classes/items/door'
import Npc from '@/classes/npc'
import Name from '@/mixins/name'
import Icon from '@/mixins/icon'
import Image from '@/mixins/image'
import Items from '@/mixins/items'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'
import Requirements from '@/mixins/requirements'

export default class Room extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Room',
      x: 0,
      y: 0,
      ...data,
    })
  }

  get x() { return this.state.x }
  get y() { return this.state.y }

  get npcs() { return store.npcs.list.filter(i => i.location === this) }
  get aggresiveNpcs() { return this.npcs.filter(npc => npc.isAggresive && !npc.isDead) }

  get doors() { return store.doors.list.filter(i => i.roomIds.includes(this.id)) }

  get img() { return `images/rooms/${this.state.img}` }

  get northDoor() { return this.doors.find(door => door.directions[this.id] === 'N') }
  get southDoor() { return this.doors.find(door => door.directions[this.id] === 'S') }
  get eastDoor() { return this.doors.find(door => door.directions[this.id] === 'E') }
  get westDoor() { return this.doors.find(door => door.directions[this.id] === 'W') }

  addNpc(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addDialog(d))
    }

    if (data instanceof Npc) {
      data.location = this
      data.hovered = false
      store.npcs.update(data)
      return data
    } else {
      const i = new Npc(data)
      i.location = this
      i.hovered = false
      store.npcs.update(i)
      return i
    }
  }

  canEnter(fromRoom, showMessage) {
    return store.player.canMove(showMessage)
      && !(this.checkRequirementsFor && !this.checkRequirementsFor('enter', showMessage));
  }

  async enter(fromRoom) {
    if (!this.canEnter(fromRoom, true)) {
      return false
    }

    if (store.game.room !== this) {
      const prevRoom = store.game.room;
      if (prevRoom) {
        if (!prevRoom.exit(this)) {
          return false
        }
      }
      store.game.room = this
      this.visited += 1
      await emit.call(this, 'onEnter')
      return true
    }
    return false
  }

  async onEnter(fromRoom) {}

  canExit(toRoom, showMessage) {
    if (store.player.isConnectedToServer) {
      if (showMessage) {
        log(`Please disconnect from ${store.player.server.name.toLowerCase()} before exiting this room`)
      }
      return false
    }
    if (store.player.isInDialog) {
      if (showMessage) {
        log('You cannot leave the room while in discussion')
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log('You cannot leave the room while in combat')
      }
      return false
    }
    if (this.aggresiveNpcs.length) {
      if (showMessage) {
        log('You cannot leave the room while there are still ennemies in it')
      }
      return false
    }
    return store.player.canMove(showMessage)
      && !(this.checkRequirementsFor && !this.checkRequirementsFor('exit', showMessage));
  }

  async exit(toRoom) {
    if (!this.canExit(toRoom, true)) {
      return false
    }
    store.game.playSound('walk')
    store.game.room = null
    await emit.call(this, 'onExit')
    return true
  }

  async onExit() {}

  addDoor(data, direction) {
    const directions = {
      [this.id]: direction
    }

    let r
    switch (direction) {
      case 'N':
        r = store.rooms.at(this.x, this.y - 1)
        if (r) {
          directions[r.id] = 'S'
        }
        break
      case 'S':
        r = store.rooms.at(this.x, this.y + 1)
        if (r) {
          directions[r.id] = 'N'
        }
        break
      case 'W':
        r = store.rooms.at(this.x - 1, this.y)
        if (r) {
          directions[r.id] = 'E'
        }
        break
      case 'E':
        r = store.rooms.at(this.x + 1, this.y)
        if (r) {
          directions[r.id] = 'W'
        }
        break
      default:
    }

    const door = new Door({
      ...data,
      directions,
    })

    store.doors.update(door)

    return door
  }
}

mixin(Room, [
  Name,
  Icon,
  Image,
  Items,
  Actions,
  Visitable,
  Requirements,
])
