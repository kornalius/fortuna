import Entity from '../entity';
import { store } from '../store';

export default class Room extends Entity {
  setupInstance(data) {
    return {
      name: 'Room',
      x: 0,
      y: 0,
      visited: 0,
      ...data,
    }
  }

  get name() { return this.state.name }

  get x() { return this.state.x }
  get y() { return this.state.y }

  get items() { return store.items.list.filter(i => i.location === this) }

  get npcs() { return store.npcs.list.filter(i => i.location === this) }

  get doors() { return store.doors.list.filter(i => i.roomIds.includes(this.id)) }

  get northDoor() { return this.doors.list.find(door => door.directions[this.id] === 'N') }
  get southDoor() { return this.doors.list.find(door => door.directions[this.id] === 'S') }
  get eastDoor() { return this.doors.list.find(door => door.directions[this.id] === 'E') }
  get westDoor() { return this.doors.list.find(door => door.directions[this.id] === 'W') }

  get hasVisited() { return this.state.visited > 0 }

  get visited() { return this.state.visited }
  set visited(value) { this.state.visited = value }

  canExit(direction) {
    if (!store.player.canMove) {
      return false
    }

    switch (direction) {
      case 'N':
        return this.northDoor?.isOpened
      case 'S':
        return this.southDoor?.isOpened
      case 'E':
        return this.eastDoor?.isOpened
      case 'W':
        return this.westDoor?.isOpened
      default:
        return false
    }
  }

  enter(door) {
    this.visited += 1
  }

  exit(door) {
  }
}
