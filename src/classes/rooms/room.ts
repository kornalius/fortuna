import flatten from 'lodash/flatten'
import { Entity, SetupData } from '@/entity'
import { mixin, emit, registerClass, can, AnyData } from '@/utils'
import { Direction, Directions, Door } from '@/classes/items/furniture/door'
import { INpcSetupData, Npc } from '@/classes/npcs/npc'
import { Item } from '@/classes/items/item'
import { Container } from '@/classes/containers/container'
import { ICode, Code, ICodeSetupData } from '@/mixins/code'
import { ILocation, ILocationSetupData, Location } from '@/mixins/location'
import { IName, INameSetupData, Name } from '@/mixins/name'
import { IPosition, IPositionSetupData, Position } from '@/mixins/position'
import { IIcon, Icon, IIconSetupData } from '@/mixins/icon'
import { IImage, IImageSetupData, Image } from '@/mixins/image'
import { IItems, IItemsSetupData, Items } from '@/mixins/items'
import { IActions, Actions, IActionsSetupData } from '@/mixins/actions'
import { IVisitable, IVisitableSetupData, Visitable } from '@/mixins/visitable'
import { IRequirements, IRequirementsSetupData, Requirements } from '@/mixins/requirements'

export interface IRoomSetupData extends
  INameSetupData,
  IIconSetupData,
  ICodeSetupData,
  IPositionSetupData,
  IImageSetupData,
  IItemsSetupData,
  IActionsSetupData,
  IVisitableSetupData,
  IRequirementsSetupData,
  ILocationSetupData
{
  onEnter?: () => Promise<void>
  onExit?: (toRoom?: Room) => Promise<void>
}

export interface Room extends
  IName,
  IIcon,
  ICode,
  IPosition,
  IImage,
  IItems,
  IActions,
  IVisitable,
  IRequirements,
  ILocation
{}

export class Room extends Entity {
  constructor(data?: IRoomSetupData) {
    super(data)
  }

  setupInstance(data?: IRoomSetupData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data as SetupData)

    return super.setupInstance({
      name: 'Room',
      locationId,
      locationStore,
      ...(data || {})
    })
  }

  get isRoom(): boolean { return true }

  get roomItems(): Item[] { return window.store.items.list.filter(i => i.location === this) }

  get items(): Item[] { return flatten([...this.roomItems, ...this.openedContainers.map(c => c.items)]) }

  get img(): string { return `images/rooms/${this.state.img}` }

  get doors(): Door[] { return window.store.doors.list.filter(i => i.roomIds.includes(this.id)) }

  get northDoor(): Door | undefined { return this.doors.find(door => door.directions[this.id] === 'N') }
  get southDoor(): Door | undefined { return this.doors.find(door => door.directions[this.id] === 'S') }
  get eastDoor(): Door | undefined { return this.doors.find(door => door.directions[this.id] === 'E') }
  get westDoor(): Door | undefined { return this.doors.find(door => door.directions[this.id] === 'W') }

  get npcs(): Npc[] { return window.store.npcs.list.filter(i => i.location === this) }
  get aggresiveNpcs(): Npc[] { return this.npcs.filter(npc => npc.isAggresive && !npc.isDead) }

  get ownerIds(): string[] { return this.location?.ownerIds || [] }
  get owners(): Npc[] { return this.location?.owners || [] }

  get presentOwners(): Npc[] { return this.owners.filter(o => !o.isDead && this.npcs.includes(o)) }

  get canSleepOnItems(): boolean { return !!this.items.find(i => (i as any).canSleepOn)}

  get containers(): Item[] {
    return this.roomItems.filter((i: any) => i instanceof Container)
  }

  /**
   * Returns all containers in the room that are opened or have been searched
   * @returns {*}
   */
  get openedContainers(): Container[] {
    return (this.containers as unknown as Container[]).filter((i: Container) => (
      (i.isContainer && i.isOpenable && i.isOpened) || (i.items?.length > 0 && i.wasSearched)
    ))
  }

  isOwnedBy(npc: Npc): boolean {
    return this.owners.includes(npc)
  }

  addOwner(npc: Npc): boolean {
    if (this.location && !this.location.isOwnedBy(npc)) {
      this.location.ownerIds.push(npc.id)
      return true
    }
    return false
  }

  addNpc(data: (Npc | INpcSetupData)[] | Npc | INpcSetupData): Npc[] | Npc {
    if (Array.isArray(data)) {
      return data.map(d => this.addNpc(d) as Npc)
    }

    if (data instanceof Npc) {
      data.location = this
      data.hovered = false
      window.store.npcs.update(data)
      return data
    } else {
      const i = new Npc(data)
      i.location = this
      i.hovered = false
      window.store.npcs.update(i)
      return i
    }
  }

  addDoor(data: Door | AnyData, direction: Direction): Door {
    const directions: Directions = {
      [this.id]: direction
    }

    let r
    switch (direction) {
      case 'N':
        r = window.store.rooms.at(this.x, this.y - 1)
        if (r) {
          directions[r.id] = 'S'
        }
        break
      case 'S':
        r = window.store.rooms.at(this.x, this.y + 1)
        if (r) {
          directions[r.id] = 'N'
        }
        break
      case 'W':
        r = window.store.rooms.at(this.x - 1, this.y)
        if (r) {
          directions[r.id] = 'E'
        }
        break
      case 'E':
        r = window.store.rooms.at(this.x + 1, this.y)
        if (r) {
          directions[r.id] = 'W'
        }
        break
      default:
    }

    if (data instanceof Door) {
      data.location = this
      data.directions = directions
      window.store.doors.update(data)
      return data
    } else {
      const d = new Door({
        ...data,
        directions,
      })
      d.location = this
      window.store.doors.update(d)
      return d
    }
  }

  canEnter(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => window.store.game.city !== this.location?.location,
        log: () => `You need to be in city ${this.location?.location.nameProper}`
      },
      {
        expr: () => window.store.game.building !== this.location,
        log: () => `You need to be in building ${this.location?.nameProper}`
      },
      {
        expr: () => !window.store.player.canMove(showMessage)
      },
    ], showMessage, 'enter')
  }

  async enter(showTravelling = false): Promise<boolean> {
    if (!this.canEnter(true)) {
      return false
    }

    if (window.store.game.room !== this) {
      const prevRoom = window.store.game.room
      if (prevRoom) {
        if (!(await prevRoom.exit(this))) {
          return false
        }
      }

      this.items.forEach(i => {
        emit(i, 'onReveal')
      })

      window.store.game.room = this
      await this.visit()
      await emit(this, 'onEnter')

      if (showTravelling) {
        setTimeout(async () => {
          // show travel and wait for it to finish animating
          window.store.player.travelling = true
        })
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
        expr: () => this.aggresiveNpcs.length > 0,
        log: () => 'You cannot leave the room while there are still ennemies in it'
      },
      {
        expr: () => !window.store.player.canMove(showMessage)
      },
    ], showMessage, 'exit')
  }

  async exit(toRoom?: Room): Promise<boolean> {
    if (!this.canExit(true)) {
      return false
    }

    this.items.forEach(i => {
      emit(i, 'onConceal')
    })

    window.store.game.room = null
    await emit(this, 'onExit', toRoom)
    return true
  }

  async onExit(toRoom?: Room): Promise<void> {
    window.store.game.playSound('walk')
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
