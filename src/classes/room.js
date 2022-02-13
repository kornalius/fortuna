import Entity from '@/entity'
import { mixin, emit } from '@/utils'
import { store } from '@/store'
import Door from '@/classes/items/door'
import Npc from '@/classes/npc'
import Name from '@/mixins/name'
import Icon from '@/mixins/icon'
import Image from '@/mixins/image'
import Items from '@/mixins/items'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'

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

  get doors() { return store.doors.list.filter(i => i.roomIds.includes(this.id)) }

  get img() { return `images/rooms/${this.state.img}` }

  get northDoor() { return this.doors.find(door => door.directions[this.id] === 'N') }
  get southDoor() { return this.doors.find(door => door.directions[this.id] === 'S') }
  get eastDoor() { return this.doors.find(door => door.directions[this.id] === 'E') }
  get westDoor() { return this.doors.find(door => door.directions[this.id] === 'W') }

  canEnter(fromRoom, showMessage) {
    return store.player.canMove(showMessage)
  }

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

  async enter(fromRoom) {
    if (!this.canEnter(fromRoom, true)) {
      return false
    }

    this.visited += 1
    if (store.game.room !== this) {
      const prevRoom = store.game.room;
      if (prevRoom) {
        prevRoom.exit(this)
      }
      store.game.room = this
      await emit.call(this, 'onEnter')
      return true
    }
    return false
  }

  async onEnter(fromRoom) {}

  canExit(toRoom, showMessage) {
    return store.player.canMove(showMessage)
  }

  async exit(toRoom) {
    if (!this.canExit(toRoom, true)) {
      return false
    }

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

mixin(Room, [Name, Icon, Image, Items, Actions, Visitable])
