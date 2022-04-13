import Entity from '@/entity'
import { mixin, emit, registerClass, can } from '@/utils'
import { store } from '@/store'
import Code from '@/mixins/code'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Image from '@/mixins/image'
import Position from '@/mixins/position'
import Icon from '@/mixins/icon'
import Hidden from '@/mixins/hidden'
import Hovered from '@/mixins/hovered'
import Actions from '@/mixins/actions'
import Visitable from '@/mixins/visitable'
import Requirements from '@/mixins/requirements'
import Building from '@/classes/buildings/building'

export default class City extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'City',
      description: 'A city',
      icon: 'city',
      startBuildingCode: null,
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
      ...data,
    })
  }

  get isCity() { return true }

  get img() { return `images/cities/${this.state.img}` }

  get startBuildingCode() { return this.state.startBuildingCode }
  set startBuildingCode(value) { this.state.startBuildingCode = value }

  get buildings() { return store.buildings.list.filter(i => i.location === this) }

  addBuilding(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addBuilding(d))
    }

    if (data instanceof Building) {
      data.location = this
      data.hovered = false
      store.buildings.update(data)
      return data
    } else {
      const i = new Building(data)
      i.location = this
      i.hovered = false
      store.buildings.update(i)
      return i
    }
  }

  canEnter(showMessage) {
    return can(this, [
      {
        expr: () => store.game.city === this,
        log: () => `You are already in ${this.name}`
      },
      {
        expr: () => store.player.isConnectedToServer,
        log: () => `Please disconnect from ${store.player.server.name.toLowerCase()} before entering this city`
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot enter the city while in discussion'
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot enter the city while in combat'
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

    if (store.game.city !== this) {
      const prevCity = store.game.city
      if (prevCity) {
        if (!prevCity.exit(this)) {
          return false
        }
      }

      this.hidden = false
      store.game.city = this
      store.game.building = null
      store.game.room = null
      await this.visit()
      await emit.call(this, 'onEnter')

      store.game.showProvince = false

      const building = store.buildings.findByCode(this.startBuildingCode)
      if (building) {
        await building.enter()
      } else {
        store.game.showCityMap = true
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
        expr: () => store.game.building && !store.game.building?.canExit(showMessage),
      },
      {
        expr: () => store.game.room && !store.game.room?.canExit(showMessage),
      },
      {
        expr: () => !store.player.canMove(showMessage),
      },
    ], showMessage, 'exit')
  }

  async exit() {
    if (!this.canExit(true)) {
      return false
    }
    if (store.game.building) {
      await store.game.building.exit()
    }
    if (store.game.room) {
      await store.game.room.exit()
    }
    store.game.playSound('walk')
    store.game.city = null
    await emit.call(this, 'onExit')
    return true
  }

  async onExit() {}
}

mixin(City, [
  Code,
  Name,
  Description,
  Position,
  Icon,
  Image,
  Hidden,
  Hovered,
  Actions,
  Visitable,
  Requirements,
])

registerClass(City)
