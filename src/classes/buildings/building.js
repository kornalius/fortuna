import Entity from '@/entity'
import { mixin, emit, log, registerClass } from '@/utils'
import { store } from '@/store'
import Location from '@/mixins/location'
import Code from '@/mixins/code'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Position from '@/mixins/position'
import Icon from '@/mixins/icon'
import Hidden from '@/mixins/hidden'
import Hovered from '@/mixins/hovered'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'
import Requirements from '@/mixins/requirements'
import Room from '@/classes/room'

export default class Building extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Building',
      description: 'A building',
      icon: 'clarity:building-solid',
      startRoomCode: null,
      locationId,
      locationStore,
      actions: [
        item => (
          {
            label: 'Enter',
            key: 'enter',
            icon: 'whh:enteralt',
            disabled: !item.canEnter(),
            click: async () => item.enter(),
          }
        ),
      ],
      ...data,
    })
  }

  get startRoomCode() { return this.state.startRoomCode }
  set startRoomCode(value) { this.state.startRoomCode = value }

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
    if (store.game.building === this) {
      if (showMessage) {
        log(`You are already in this building`)
      }
      return false
    }
    if (store.player.isConnectedToServer) {
      if (showMessage) {
        log(`Please disconnect from ${store.player.server.name.toLowerCase()} before entering this building`)
      }
      return false
    }
    if (store.player.isInDialog) {
      if (showMessage) {
        log('You cannot enter the building while in discussion')
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log('You cannot enter the building while in combat')
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

      this.hidden = false
      store.game.building = this
      store.game.room = null
      await this.visit()
      await emit.call(this, 'onEnter')

      store.game.showCity = null
      store.game.showCityMap = false

      const room = store.rooms.findByCode(this.startRoomCode)
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
  Code,
  Location,
  Name,
  Description,
  Position,
  Icon,
  Hidden,
  Hovered,
  Actions,
  Visitable,
  Requirements,
])

registerClass(Building)
