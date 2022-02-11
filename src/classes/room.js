import Entity from '@/entity'
import { mixin, emit } from '@/utils'
import { store } from '@/store'
import Door from '@/classes/items/door'
import Items from '@/mixins/items'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'

export default class Room extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Room',
      x: 0,
      y: 0,
      img: null,
      icon: '',
      ...data,
    })
  }

  get name() { return this.state.name }

  get x() { return this.state.x }
  get y() { return this.state.y }

  get npcs() { return store.npcs.list.filter(i => i.location === this) }

  get doors() { return store.doors.list.filter(i => i.roomIds.includes(this.id)) }

  get northDoor() { return this.doors.find(door => door.directions[this.id] === 'N') }
  get southDoor() { return this.doors.find(door => door.directions[this.id] === 'S') }
  get eastDoor() { return this.doors.find(door => door.directions[this.id] === 'E') }
  get westDoor() { return this.doors.find(door => door.directions[this.id] === 'W') }

  get img() { return this.state.img }
  set img(value) { this.state.img = value }

  get icon() { return this.state.icon }
  set icon(value) { this.state.icon = value }

  canEnter(fromRoom, showMessage) {
    return store.player.canMove(showMessage)
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

mixin(Room, [Items, Actions, Visitable])
