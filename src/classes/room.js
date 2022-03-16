import flatten from 'lodash/flatten'
import Entity from '@/entity'
import { mixin, emit, registerClass, can } from '@/utils'
import { store } from '@/store'
import Door from '@/classes/items/door'
import Npc from '@/classes/npcs/npc'
import Code from '@/mixins/code'
import Location from '@/mixins/location'
import Name from '@/mixins/name'
import Position from '@/mixins/position'
import Icon from '@/mixins/icon'
import Image from '@/mixins/image'
import Items from '@/mixins/items'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'
import Requirements from '@/mixins/requirements'

export default class Room extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Room',
      locationId,
      locationStore,
      ...data,
    })
  }

  get isRoom() { return true }

  get roomItems() { return store.items.list.filter(i => i.location === this) }

  get items() { return flatten([...this.roomItems, ...this.openedContainers.map(c => c.items)]) }

  get img() { return `images/rooms/${this.state.img}` }

  get doors() { return store.doors.list.filter(i => i.roomIds.includes(this.id)) }

  get northDoor() { return this.doors.find(door => door.directions[this.id] === 'N') }
  get southDoor() { return this.doors.find(door => door.directions[this.id] === 'S') }
  get eastDoor() { return this.doors.find(door => door.directions[this.id] === 'E') }
  get westDoor() { return this.doors.find(door => door.directions[this.id] === 'W') }

  get npcs() { return store.npcs.list.filter(i => i.location === this) }
  get aggresiveNpcs() { return this.npcs.filter(npc => npc.isAggresive && !npc.isDead) }

  get ownerIds() { return this.location.ownerIds }
  get owners() { return this.location.owners }

  get presentOwners() { return this.owners.filter(o => this.npcs.includes(o)) }

  get canSleepOnItems() { return this.items.find(i => i.canSleepOn)}

  /**
   * Returns all containers in the room that are opened or have been searched
   * @returns {*}
   */
  get openedContainers() {
    return this.roomItems.filter(i => (
      (i.isOpenable && i.isOpened) || (i.items?.length > 0 && i.wasSearched))
    )
  }

  isOwnedBy(npc) {
    let n = npc
    if (typeof npc === 'string') {
      n = this.get(npc)
    }
    return this.owners.includes(n)
  }

  addOwner(npc) {
    if (!this.location.isOwnedBy(npc)) {
      this.location.ownerIds.push(npc.id)
      return true
    }
    return false
  }

  addNpc(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addNpc(d))
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
    return can(this, [
      {
        expr: () => store.game.city !== this.location?.location,
        log: () => `You need to be in city ${this.location.location.name}`
      },
      {
        expr: () => store.game.building !== this.location,
        log: () => `You need to be in building ${this.location.name}`
      },
      {
        expr: () => !store.player.canMove(showMessage)
      },
    ], showMessage, 'enter')
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
      await this.visit()
      await emit.call(this, 'onEnter')
      return true
    }
    return false
  }

  async onEnter(fromRoom) {}

  canExit(toRoom, showMessage) {
    return can(this, [
      {
        expr: () => store.player.isConnectedToServer,
        log: () => `Please disconnect from ${store.player.server.name.toLowerCase()} before exiting this room`
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot leave the room while in discussion'
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot leave the room while in combat'
      },
      {
        expr: () => this.aggresiveNpcs.length,
        log: () => 'You cannot leave the room while there are still ennemies in it'
      },
      {
        expr: () => !store.player.canMove(showMessage)
      },
    ], showMessage, 'exit')
  }

  async exit(toRoom) {
    if (!this.canExit(toRoom, true)) {
      return false
    }
    store.game.room = null
    await emit.call(this, 'onExit')
    return true
  }

  async onExit() {
    store.game.playSound('walk')
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
}

mixin(Room, [
  Code,
  Location,
  Name,
  Position,
  Icon,
  Image,
  Items,
  Actions,
  Visitable,
  Requirements,
])

registerClass(Room)
