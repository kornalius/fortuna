import Entity from '@/entity'
import { mixin, emit, log } from '@/utils'
import { store } from '@/store'
import Location from '@/mixins/location'
import Name from '@/mixins/name'
import Position from '@/mixins/position'
import Icon from '@/mixins/icon'
import Image from '@/mixins/image'
import Hidden from '@/mixins/hidden'
import Hovered from '@/mixins/hovered'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'
import Requirements from '@/mixins/requirements'
import Room from '@/classes/room'

export default class Building extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Building',
      startRoomName: '',
      ...data,
    })
  }

  get img() { return `images/cities/${this.state.img}` }

  get startRoomName() { return this.state.startRoomName }
  set startRoomName(value) { this.state.startRoomName = value }

  get buildings() { return store.buildings.list.filter(i => i.location === this) }

  addRoom(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addRoom(d))
    }

    if (data instanceof Room) {
      data.location = this
      store.rooms.update(data)
      return data
    } else {
      const i = new Room(data)
      i.location = this
      store.rooms.update(i)
      return i
    }
  }

  canEnter(showMessage) {
    if (store.game.city !== this.location) {
      if (showMessage) {
        log(`You need to be in city ${this.location.name} to enter this building`)
      }
      return false
    }
    return store.player.canMove(showMessage)
      && !(this.checkRequirementsFor && !this.checkRequirementsFor('enter', showMessage));
  }

  async enter() {
    if (!this.canEnter(true)) {
      return false
    }

    if (store.game.building !== this) {
      const prevBuilding = store.game.building;
      if (prevBuilding) {
        if (!prevBuilding.exit(this)) {
          return false
        }
      }
      store.game.building = this
      store.game.room = null
      await this.visit()
      await emit.call(this, 'onEnter')

      const room = store.rooms.findByName(this.startRoomName)
      if (room) {
        await room.enter()
      }

      return true
    }
    return false
  }

  async onEnter() {}

  canExit(showMessage) {
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
    if (store.game.room && !store.game.room?.canExit(showMessage)) {
      return false
    }
    return store.player.canMove(showMessage)
      && !(this.checkRequirementsFor && !this.checkRequirementsFor('exit', showMessage));
  }

  async exit() {
    if (!this.canExit(true)) {
      return false
    }
    if (store.game.room) {
      await store.game.room.exit()
    }
    store.game.playSound('walk')
    store.game.building = null
    await emit.call(this, 'onExit')
    return true
  }

  async onExit() {}
}

mixin(Building, [
  Location,
  Name,
  Position,
  Icon,
  Image,
  Hidden,
  Hovered,
  Actions,
  Visitable,
  Requirements,
])
