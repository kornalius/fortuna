import { mixin, emit, registerClass, can } from '@/utils'
import compact from 'lodash/compact'
import { Entity, SetupData } from '@/entity'
import { IRoomSetupData, Room } from '@/classes/rooms/room'
import { Npc } from '@/classes/npcs/npc'
import { ILocation, ILocationSetupData, Location } from '@/mixins/location'
import { ICode, Code, ICodeSetupData } from '@/mixins/code'
import { IName, INameSetupData, Name } from '@/mixins/name'
import { IDescription, Description, IDescriptionSetupData } from '@/mixins/description'
import { IPosition, IPositionSetupData, Position } from '@/mixins/position'
import { IIcon, Icon, IIconSetupData } from '@/mixins/icon'
import { IHidden, Hidden, IHiddenSetupData } from '@/mixins/hidden'
import { IHovered, Hovered, IHoveredSetupData } from '@/mixins/hovered'
import { IActions, Actions, IDropdownItem, IActionsSetupData } from '@/mixins/actions'
import { IVisitable, IVisitableSetupData, Visitable } from '@/mixins/visitable'
import { IRequirements, IRequirementsSetupData, Requirements } from '@/mixins/requirements'
import { ITooltip, ITooltipSetupData, Tooltip } from '@/mixins/tooltip'

export type OpenHours = [string, string];

export interface IBuildingSetupData extends
  ICodeSetupData,
  ILocationSetupData,
  INameSetupData,
  IDescriptionSetupData,
  IPositionSetupData,
  IIconSetupData,
  IHiddenSetupData,
  IHoveredSetupData,
  IActionsSetupData,
  IVisitableSetupData,
  IRequirementsSetupData,
  ITooltipSetupData
{
  // start room code to go to when entering the building
  startRoomCode?: string | null
  // opening hours [start_time, end_time]
  hours?: OpenHours[]
  // owner ids of this room
  ownerIds?: string[]
  onEnter?: () => Promise<void>
  onExit?: (toBuilding?: Building) => Promise<void>
}

export interface Building extends
  ICode,
  ILocation,
  IName,
  IDescription,
  IPosition,
  IIcon,
  IHidden,
  IHovered,
  IActions,
  IVisitable,
  IRequirements,
  ITooltip
{}

export class Building extends Entity {
  constructor(data?: IBuildingSetupData) {
    super(data)
  }

  setupInstance(data?: IBuildingSetupData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data as SetupData)

    return super.setupInstance({
      name: 'Building',
      description: 'A building',
      icon: 'building',
      startRoomCode: null,
      locationId,
      locationStore,
      actions: [
        (item: Building): IDropdownItem | undefined => (
          {
            label: 'Enter',
            key: 'enter',
            icon: 'enter',
            disabled: !item.canEnter(),
            click: item.enter,
          }
        ),
      ],
      hours: null,
      // npc ids of owners
      ownerIds: [],
      ...(data || {})
    })
  }

  get isBuilding(): boolean { return true }

  get startRoomCode(): string | null { return this.state.startRoomCode }
  set startRoomCode(value) { this.state.startRoomCode = value }

  get rooms(): Room[] { return window.store.rooms.list.filter(i => i.location === this) }

  get hours(): OpenHours | null { return this.state.hours }
  set hours(value) { this.state.hours = value }

  get ownerIds(): string[] { return this.state.ownerIds }
  set ownerIds(value) { this.state.ownerIds = value }

  get owners(): Npc[] { return compact(this.ownerIds.map(id => window.store.npcs.get(id))) }
  set owners(value) { this.ownerIds = value.map(npc => npc.id) }

  isOwnedBy(npc: Npc): boolean {
    return this.owners.includes(npc)
  }

  addOwner(npc: Npc): boolean {
    if (!this.isOwnedBy(npc)) {
      this.ownerIds.push(npc.id)
      return true
    }
    return false
  }

  addRoom(data: (Room | IRoomSetupData)[] | Room | IRoomSetupData): Room[] | Room {
    if (Array.isArray(data)) {
      return data.map(d => this.addRoom(d) as Room)
    }

    if (data instanceof Room) {
      data.location = this
      window.store.rooms.update(data)
      return data
    } else {
      const r = new Room(data)
      r.location = this
      window.store.rooms.update(r)
      return r
    }
  }

  canEnter(showMessage?: boolean): boolean {
    let isBetween = true
    if (this.hours && this.hours.length === 2) {
      const sd = [
        window.store.game.date,
        this.hours[0],
      ].join(' ')
      const ed = [
        window.store.game.date,
        this.hours[1],
      ].join(' ')
      isBetween = window.store.game.isBetween(sd, ed)
    }

    return can(this, [
      {
        expr: () => window.store.game.city !== this.location,
        log: () => `You need to be in city ${this.location?.nameDisplay} to enter this building`
      },
      {
        expr: () => window.store.game.building === this,
        log: () => `You are already in this building`
      },
      {
        expr: () => window.store.player.isConnectedToServer,
        log: () => `Please disconnect from ${window.store.player.server?.nameDisplay} before entering this building`
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot enter the building while in discussion'
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot enter the building while in combat'
      },
      {
        expr: () => !isBetween,
        log: () => `This building is closed, it opens between ${this.hours?.[0]} and ${this.hours?.[1]}`
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

    if (window.store.game.building !== this) {
      const prevBuilding = window.store.game.building
      if (prevBuilding) {
        if (!(await prevBuilding.exit())) {
          return false
        }
      }

      this.rooms.forEach(r => {
        emit(r, 'onReveal')
      })

      window.store.game.showCityMap = false

      this.hidden = false
      window.store.game.building = this
      window.store.game.room = null
      await this.visit()
      await emit(this, 'onEnter')

      const room = window.store.rooms.findByCode(this.startRoomCode) as Room | undefined
      if (room) {
        await room.enter(true)
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
        expr: () => !!window.store.game.room && !window.store.game.room.canExit(showMessage),
      },
    ], showMessage, 'exit')
  }

  async exit(toBuilding?: Building): Promise<boolean> {
    if (!this.canExit(true)) {
      return false
    }

    this.rooms.forEach(r => {
      emit(r, 'onConceal')
    })

    if (window.store.game.room) {
      await window.store.game.room.exit()
    }
    window.store.game.building = null
    await emit(this, 'onExit', toBuilding)
    window.store.game.showCityMap = true
    return true
  }

  async onExit(toBuilding?: Building): Promise<void> {
    window.store.game.playSound('walk')
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
  Tooltip,
])

registerClass(Building)
