import Entity from '@/entity'
import { store } from '@/store'
import { mixin } from '@/utils'
import Door from '@/classes/items/door'
import Items from '@/mixins/items'
import Actions from '@/mixins/actions'

export default class Room extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Room',
      x: 0,
      y: 0,
      visited: 0,
      img: undefined,
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

  get hasVisited() { return this.state.visited > 0 }
  get visited() { return this.state.visited }
  set visited(value) { this.state.visited = value }

  get img() { return this.state.img }
  set img(value) { this.state.img = value }

  get icon() { return this.state.icon }
  set icon(value) { this.state.icon = value }

  canEnter(fromRoom, showMessage) {
    return store.player.canMove(showMessage)
  }

  enter(fromRoom) {
    if (!this.canEnter(fromRoom, true)) {
      return false
    }

    this.visited += 1
    if (store.game.room !== this) {
      store.game.room = this
    }

    return true
  }

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

  onAction(action) {
  }
}

mixin(Room, [Items, Actions])
