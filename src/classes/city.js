import Entity from '@/entity'
import { mixin, emit, log, registerClass } from '@/utils'
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
      icon: 'emojione-monotone:cityscape',
      startBuildingCode: null,
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
    if (store.game.city === this) {
      if (showMessage) {
        log(`You are already in ${this.name}`)
      }
      return false
    }
    if (store.player.isConnectedToServer) {
      if (showMessage) {
        log(`Please disconnect from ${store.player.server.name.toLowerCase()} before entering this city`)
      }
      return false
    }
    if (store.player.isInDialog) {
      if (showMessage) {
        log('You cannot enter the city while in discussion')
      }
      return false
    }
    if (store.player.isInCombat) {
      if (showMessage) {
        log('You cannot enter the city while in combat')
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

    if (store.game.city !== this) {
      const prevCity = store.game.city;
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
        store.game.showCity = this
        store.game.showCityMap = true
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
    if (store.game.building && !store.game.building?.canExit(showMessage)) {
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
