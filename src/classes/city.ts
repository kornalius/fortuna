import { Entity, SetupData } from '@/entity'
import { mixin, emit, registerClass, can, AnyData } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { ICode, Code } from '@/mixins/code'
import { IName, Name } from '@/mixins/name'
import { IDescription, Description } from '@/mixins/description'
import { IImage, Image } from '@/mixins/image'
import { IPosition, Position } from '@/mixins/position'
import { IIcon, Icon } from '@/mixins/icon'
import { IHidden, Hidden } from '@/mixins/hidden'
import { IHovered, Hovered } from '@/mixins/hovered'
import { IActions, Actions } from '@/mixins/actions'
import { IVisitable, Visitable } from '@/mixins/visitable'
import { IRequirements, Requirements } from '@/mixins/requirements'

export interface City extends
  ICode,
  IName,
  IDescription,
  IPosition,
  IIcon,
  IImage,
  IHidden,
  IHovered,
  IActions,
  IVisitable,
  IRequirements
{}

export class City extends Entity {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'City',
      description: 'A city',
      icon: 'city',
      startBuildingCode: null,
      actions: [
        (item: City) => (
          {
            label: 'Enter',
            key: 'enter',
            icon: 'enter',
            disabled: !item.canEnter(),
            click: async () => item.enter(),
          }
        ),
      ],
      ...(data || {})
    })
  }

  get isCity(): boolean { return true }

  get img(): string { return `images/cities/${this.state.img}` }

  get startBuildingCode(): string | null { return this.state.startBuildingCode }
  set startBuildingCode(value) { this.state.startBuildingCode = value }

  get buildings(): Building[] {
    return window.store.buildings.list.filter(i => i.location?.id === this.id)
  }

  addBuilding(data: (Building | AnyData)[] | Building | AnyData): Building[] | Building {
    if (Array.isArray(data)) {
      return data.map(d => this.addBuilding(d) as Building)
    }

    if (data instanceof Building) {
      data.location = this
      data.hovered = false
      window.store.buildings.update(data)
      return data
    } else {
      const b = new Building(data)
      b.location = this
      b.hovered = false
      window.store.buildings.update(b)
      return b
    }
  }

  canEnter(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => window.store.game.city?.id === this.id,
        log: () => `You are already in ${this.nameDisplay}`
      },
      {
        expr: () => window.store.player.isConnectedToServer,
        log: () => `Please disconnect from ${window.store.player.server?.nameDisplay} before entering this city`
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot enter the city while in discussion'
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot enter the city while in combat'
      },
      {
        expr: () => !window.store.player.canMove(showMessage),
      }
    ], showMessage, 'enter')
  }

  async enter(): Promise<boolean> {
    if (!this.canEnter(true)) {
      return false
    }

    if (window.store.game.city !== this) {
      const prevCity = window.store.game.city
      if (prevCity) {
        if (!(await prevCity.exit(this))) {
          return false
        }
      }

      this.hidden = false
      window.store.game.city = this
      window.store.game.building = null
      window.store.game.room = null
      await this.visit()
      await emit(this, 'onEnter')

      window.store.game.showProvince = false

      const building = window.store.buildings.findByCode(this.startBuildingCode) as Building
      if (building) {
        await building.enter()
      } else {
        window.store.game.showCityMap = true
      }

      return true
    }
    return false
  }

  async onEnter(): Promise<void> {}

  canExit(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => window.store.player.isConnectedToServer,
        log: () => `Please disconnect from ${window.store.player.server?.nameDisplay} before exiting this room`
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot leave the room while in discussion'
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot leave the room while in combat'
      },
      {
        expr: () => !window.store.game.building?.canExit(showMessage),
      },
      {
        expr: () => !window.store.game.room?.canExit(showMessage),
      },
      {
        expr: () => !window.store.player.canMove(showMessage),
      },
    ], showMessage, 'exit')
  }

  async exit(toCity?: City): Promise<boolean> {
    if (!this.canExit(true)) {
      return false
    }
    if (window.store.game.building) {
      await window.store.game.building.exit()
    }
    if (window.store.game.room) {
      await window.store.game.room.exit()
    }
    window.store.game.playSound('walk')
    window.store.game.city = null
    await emit(this, 'onExit', toCity)
    return true
  }

  async onExit(toCity?: City): Promise<void> {}
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
