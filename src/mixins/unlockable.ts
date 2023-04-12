/**
 * Make the object unlockable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { Entity, State } from '@/entity'
import { IName, INameData } from './name'
import { IRequirements, IRequirementsData } from './requirements'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IUnlockableData extends
  INameData,
  IRequirementsData,
  IActionsData
{
  // if the object is unlockable
  unlockable?: boolean
  // is the object locked
  locked?: boolean
  // key needed to open
  keyId?: string | null,
  // keypad code to open the door
  keypadCode?: string | null,
  onUnlock?: () => Promise<void>
}

export interface IUnlockable extends
  IName,
  IRequirements,
  IActions
{
  state: State
  get isUnlockable(): boolean
  set unlockable(value: boolean)
  get isLocked(): boolean
  get isUnlocked(): boolean
  set locked(value: boolean)
  get keyId(): string | null
  set keyId(value)
  get keypadCode(): string | null
  set keypadCode(value)
  get key(): Entity | undefined
  set key(value: Entity | undefined | null)
  get unlockLabel(): string
  canUnlock(showMessage?: boolean): boolean
  unlock(): Promise<boolean>
  onUnlock(): Promise<void>
}

// @ts-ignore
export const Unlockable: IUnlockable = {
  state: {
    unlockable: true,
    locked: false,
    keyId: null,
    keypadCode: null,
    actions: [
      (item: IUnlockable): IDropdownItem | undefined => (
        item.isUnlockable && item.isLocked
          ? {
            label: item.unlockLabel,
            key: 'unlock',
            icon: 'unlock',
            disabled: !item.canUnlock(),
            click: () => item.unlock(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'unlock', dex: 1 },
    ],
  } as IUnlockableData,

  get isUnlockable(): boolean { return this.state.unlockable },
  set unlockable(value: boolean) { this.state.unlockable = value },

  get isLocked(): boolean { return this.state.locked },
  get isUnlocked(): boolean { return !this.state.locked },
  set locked(value: boolean) { this.state.locked = value },

  get keyId(): string | null { return this.state.keyId },
  set keyId(value) { this.state.keyId = value },

  get keypadCode(): string | null { return this.state.keypadCode },
  set keypadCode(value) { this.state.keypadCode = value },

  get key(): Entity | undefined {
    return this.keyId
      ? window.store.items.get(this.keyId)
      : undefined
  },
  set key(value: Entity | undefined | null) {
    if (value) {
      this.keyId = value.id
    } else {
      this.keyId = null
    }
  },

  get unlockLabel(): string { return `Unlock ${this.requirementsLabelFor('unlock')}` },

  canUnlock(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isUnlockable,
        log: () => `${this.nameProper} cannot be unlocked`
      },
      {
        expr: () => !this.isLocked,
        log: () => `${this.nameProper} is not locked`
      },
      {
        expr: () => !!this.keyId && !window.store.player.has(this.keyId),
        log: () => `${this.nameProper} needs a key to be unlocked`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot unlock this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot unlock this while in conversation'
      },
    ], showMessage, 'unlock')
  },

  async unlock(): Promise<boolean> {
    if (!this.canUnlock(true)) {
      return false
    }
    this.locked = false
    log('Door has been unlocked', LOG_WARN, this.icon)
    await emit(this, 'onUnlock')
    return true
  },

  async onUnlock(): Promise<void> {
    window.store.game.playSound('unlock')
  },
}
