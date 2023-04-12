/**
 * Makes an object openable and/or closable
 */

import compact from 'lodash/compact'
import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameSetupData } from './name'
import { IIcon, IIconSetupData } from './icon'
import { IUnlockable, IUnlockableSetupData } from './unlockable'
import { IRequirements, IRequirementsSetupData } from './requirements'
import { IActions, IActionsSetupData, IDropdownItem } from '@/mixins/actions'

export interface IOpenableSetupData extends
  INameSetupData,
  IIconSetupData,
  IUnlockableSetupData,
  IRequirementsSetupData,
  IActionsSetupData
{
  // is the object openable
  openable?: boolean
  // does it have an open state icon?
  openIconSuffix?: boolean
  // is the object closable
  closeable?: boolean
  // is the object opened
  opened?: boolean
  onOpen?: () => Promise<void>
  onClose?: () => Promise<void>
}

export interface IOpenable extends
  IName,
  IIcon,
  IUnlockable,
  IRequirements,
  IActions
{
  state: State
  get isOpenable(): boolean
  set openable(value: boolean)
  get isOpened(): boolean
  set opened(value: boolean)
  get isCloseable(): boolean
  set closeable(value: boolean)
  get isClosed(): boolean
  get openIconSuffix(): boolean
  set openIconSuffix(value)
  get iconSuffix(): string | null
  set iconSuffix(value)
  get openLabel(): string
  get openKey(): string
  get openIcon(): string
  get openDisabled(): boolean
  get openClick(): () => Promise<boolean>
  canOpen(showMessage?: boolean): boolean
  open(): Promise<boolean>
  onOpen(): Promise<void>
  canClose(showMessage?: boolean): boolean
  close(): Promise<boolean>
  onClose(): Promise<void>
}

// @ts-ignore
export const Openable: IOpenable = {
  state: {
    openable: true,
    openIconSuffix: false,
    closeable: true,
    opened: false,
    actions: [
      (item: IOpenable): IDropdownItem | undefined => (
        item.isOpenable
          ? {
            label: item.openLabel,
            key: item.openKey,
            icon: item.openIcon,
            disabled: !item.canOpen(),
            click: item.openClick,
          }
          : undefined
      ),
    ],
  } as IOpenableSetupData,

  get isOpenable(): boolean { return this.state.openable },
  set openable(value: boolean) { this.state.openable = value },

  get isOpened(): boolean { return this.state.opened },
  set opened(value: boolean) { this.state.opened = value },

  get isCloseable(): boolean { return this.state.closeable },
  set closeable(value: boolean) { this.state.closeable = value },

  get isClosed(): boolean { return !this.state.opened },

  get openIconSuffix(): boolean { return this.state.openIconSuffix },
  set openIconSuffix(value) { this.state.openIconSuffix = value },

  get iconSuffix(): string | null {
    if (!this.openIconSuffix) {
      return this.state.iconSuffix
    }
    return compact([this.state.iconSuffix, this.isOpened ? 'open' : 'close']).join('-')
  },
  set iconSuffix(value) { this.state.iconSuffix = value },

  get openLabel(): string {
    return !this.isOpened
      ? `Open ${this.requirementsLabelFor('open')}`
      : `Close ${this.requirementsLabelFor('close')}`
  },

  get openKey(): string { return this.isOpened ? 'close' : 'open' },

  get openIcon(): string { return this.isOpened ? 'close' : 'open' },

  get openDisabled(): boolean { return this.isOpened ? !this.canClose() : !this.canOpen() },

  get openClick(): () => Promise<boolean> {
    if (this.isOpened) {
      return async () => this.close()
    }
    return async () => this.open()
  },

  canOpen(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isOpenable || !this.openDisabled,
        log: () => `${this.nameProper} cannot be opened`
      },
      {
        expr: () => this.isOpened,
        log: () => `${this.nameProper} is already opened`
      },
      {
        expr: () => this.isLocked,
        log: () => `${this.nameProper} is locked`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot open this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot open this while in conversation'
      },
    ], showMessage, 'open')
  },

  async open(): Promise<boolean> {
    if (!this.canOpen(true)) {
      return false
    }
    this.opened = true
    log(`You opened ${this.nameDisplay}`, LOG_WARN, this.icon)
    await emit(this, 'onOpen')
    return true
  },

  async onOpen(): Promise<void> {},

  canClose(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isCloseable,
        log: () => `${this.nameProper} cannot be closed`
      },
      {
        expr: () => this.isClosed,
        log: () => `${this.nameProper} is already closed`
      },
      {
        expr:() =>  window.store.player.isInCombat,
        log: () => 'You cannot close this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot close this while in conversation'
      },
    ], showMessage, 'close')
  },

  async close(): Promise<boolean> {
    if (!this.canClose(true)) {
      return false
    }
    this.opened = false
    log(`You closed ${this.nameDisplay}`, LOG_WARN, this.icon)
    await emit(this, 'onClose')
    return true
  },

  async onClose(): Promise<void> {},
}
