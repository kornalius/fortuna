import { IItemData, Item } from '../item'
import { can, emit, mixin, oppositeDirection, registerClass } from '@/utils'
import { SetupData } from '@/entity'
import { IOpenable, IOpenableData, Openable } from '@/mixins/openable'
import { IUnlockable, IUnlockableData, Unlockable } from '@/mixins/unlockable'
import { IUsable } from '@/mixins/usable'
import { Room } from '@/classes/rooms/room'
import compact from 'lodash/compact'
import { IDropdownItem } from '@/mixins/actions'

export type Direction = 'N' | 'S' | 'E' | 'W'

// { roomId: Direction, ... }
export type Directions = { [key: string]: Direction }

export interface IDoorData extends
  IItemData,
  IOpenableData,
  IUnlockableData
{
  // which room ids are in which directions
  directions?: Directions
}

export interface Door extends
  IOpenable,
  IUnlockable
{}

export class Door extends Item {
  constructor(data?: IDoorData) {
    super(data)
  }

  setupInstance(data?: IDoorData): SetupData | undefined {
    return super.setupInstance({
      name: 'Door',
      icon: 'door',
      keyId: data?.keyId,
      usable: true,
      pickable: false,
      dropable: false,
      directions: {},
      actions: [
        (item: IUsable): IDropdownItem | undefined => (
          {
            label: item.useLabel,
            key: 'use',
            icon: 'enter',
            disabled: !item.canUse(),
            click: () => item.use(),
          }
        ),
      ],
      actionsOrder: [
        'use',
        'toggleOpen',
        'unlock',
      ],
      ...(data || {})
    })
  }

  get directions(): Directions { return this.state.directions }
  set directions(value: Directions) { this.state.directions = value }

  get direction(): Direction | undefined {
    return window.store.game.room ? this.directions[window.store.game.room.id] : undefined
  }

  get roomIds(): string[] { return Object.keys(this.directions) }
  get rooms(): Room[] { return compact(this.roomIds.map(id => window.store.rooms.get(id))) }

  get useLabel(): string {
    return `Enter ${this.requirementsLabelFor('use')}`
  }

  roomForDirection(d: string) {
    const od = oppositeDirection(d)
    const id = this.roomIds.find(id => this.directions[id] === od)
    return window.store.rooms.get(id)
  }

  canUse(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isOpened,
        log: () => 'The door is not opened'
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot enter this door while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot enter this door while in conversation'
      },
      {
        expr: () => this.isLocked,
        log: () => `${this.nameProper} is locked`
      },
      {
        expr: () => !this.direction,
        log: () => `${this.nameProper} as no direction assigned to it`
      },
      {
        expr: () => !!window.store.game.room && !window.store.game.room.canExit(showMessage),
      }
    ], showMessage)
  }

  async use() {
    if (!this.canUse(true)) {
      return false
    }
    if (this.direction) {
      const room = this.roomForDirection(this.direction)
      if (room && room.canEnter(true)) {
        await room.enter()
        await emit(this, 'onUse')
      }
    }
    return false
  }

  async onOpen(): Promise<void> {
    window.store.game.playSound('open-door')
  }

  async onClose(): Promise<void> {
    window.store.game.playSound('close-door')
  }
}

mixin(Door, [
  Openable,
  Unlockable,
])

registerClass(Door)
