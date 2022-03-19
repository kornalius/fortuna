import Entity from '@/entity'
import { mixin, emit, registerClass, can } from '@/utils'
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
      icon: 'building',
      startRoomCode: null,
      locationId,
      locationStore,
      actions: [
        item => (
          {
            label: 'Enter',
            key: 'enter',
            icon: 'enter',
            disabled: !item.canEnter(),
            click: async () => item.enter(),
          }
        ),
      ],
      // opening hours [start_time, end_time]
      hours: null,
      // npc ids of owners
      ownerIds: [],
      ...data,
    })
  }

  get isBuilding() { return true }

  get startRoomCode() { return this.state.startRoomCode }
  set startRoomCode(value) { this.state.startRoomCode = value }

  get buildings() { return store.buildings.list.filter(i => i.location === this) }

  get hours() { return this.state.hours }
  set hours(value) { this.state.hours = value }

  get ownerIds() { return this.state.ownerIds }
  set ownerIds(value) { this.state.ownerIds = value }

  get owners() { return this.ownerIds.map(id => store.npcs.get(id)) }
  set owners(value) { this.ownerIds = value.map(npc => npc.id) }

  isOwnedBy(npc) {
    let n = npc
    if (typeof npc === 'string') {
      n = this.get(npc)
    }
    return this.owners.includes(n)
  }

  addOwner(npc) {
    if (!this.isOwnedBy(npc)) {
      this.ownerIds.push(npc.id)
      return true
    }
    return false
  }

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
    let isBetween = true
    if (this.hours && this.hours.length === 2) {
      const sd = [
        store.game.date,
        this.hours[0],
      ].join(' ')
      const ed = [
        store.game.date,
        this.hours[1],
      ].join(' ')
      isBetween = store.game.isBetween(sd, ed)
    }

    return can(this, [
      {
        expr: () => store.game.city !== this.location,
        log: () => `You need to be in city ${this.location.name} to enter this building`
      },
      {
        expr: () => store.game.building === this,
        log: () => `You are already in this building`
      },
      {
        expr: () => store.player.isConnectedToServer,
        log: () => `Please disconnect from ${store.player.server.name.toLowerCase()} before entering this building`
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot enter the building while in discussion'
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot enter the building while in combat'
      },
      {
        expr: () => !isBetween,
        log: () => `This building is closed, it opens between ${this.hours[0]} and ${this.hours[1]}`
      },
      {
        expr: () => !store.player.canMove(showMessage),
      }
    ], showMessage, 'enter')
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
        expr: () => store.game.room && !store.game.room?.canExit(showMessage),
      },
    ], showMessage, 'exit')
  }

  async exit() {
    if (!this.canExit(true)) {
      return false
    }
    if (store.game.room) {
      await store.game.room.exit()
    }
    store.game.building = null
    await emit.call(this, 'onExit')
    return true
  }

  async onExit() {
    store.game.playSound('walk')
  }
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
