/**
 * Allow item to be activated or disactivated
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameData } from './name'
import { IRequirements, IRequirementsData } from './requirements'
import { IOperation, IOperationData } from './operation'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IActivableData extends
  INameData,
  IActionsData,
  IOperationData,
  IRequirementsData
{
  // is the item activable
  activable?: boolean
  // can the item be disactivated
  disactivable?: boolean
  // time it takes to activate or disactivate
  activationDelay?: number
  // is the item active or not
  active?: boolean
  onActivate?: () => Promise<void>
  onDisactivate?: () => Promise<void>
}

export interface IActivable extends
  IName,
  IActions,
  IRequirements,
  IOperation
{
  state: State
  get isActivable(): boolean
  set activable(value: boolean)
  get isDisactivable(): boolean
  set disactivable(value: boolean)
  get isActive(): boolean
  set active(value: boolean)
  get activationDelay(): number
  set activationDelay(value)
  get activateLabel(): string
  get disactivateLabel(): string
  canActivate(showMessage?: boolean): boolean
  activate(): Promise<boolean>
  onActivate(): Promise<void>
  canDisactivate(showMessage?: boolean): boolean
  disactivate(): Promise<boolean>
  onDisactivate(): Promise<void>
  toggleActivate(): Promise<boolean>
}

// @ts-ignore
export const Activable: IActivable = {
  state: {
    activable: false,
    disactivable: false,
    activationDelay: 1,
    active: false,
    actions: [
      (item: IActivable): IDropdownItem | undefined => (
        item.isActivable && !item.isActive
        ? {
            label: item.activateLabel,
            key: 'activate',
            icon: 'activate',
            disabled: !item.canActivate(),
            click: () => item.activate(),
          }
        : undefined
      ),
      (item: IActivable): IDropdownItem | undefined => (
        item.isDisactivable && item.isActive
          ? {
            label: item.disactivateLabel,
            key: 'disactivate',
            icon: 'disactivate',
            disabled: !item.canDisactivate(),
            click: () => item.disactivate(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'activate', dex: 1 },
      { name: 'disactivate', dex: 1 },
    ],
  } as IActivableData,

  get isActivable(): boolean { return this.state.activable },
  set activable(value: boolean) { this.state.activable = value },

  get isDisactivable(): boolean { return this.state.disactivable },
  set disactivable(value: boolean) { this.state.disactivable = value },

  get isActive(): boolean { return this.state.active },
  set active(value: boolean) { this.state.active = value },

  get activationDelay(): number { return this.state.activationDelay },
  set activationDelay(value) { this.state.activationDelay = value },

  get activateLabel(): string { return `Activate ${this.requirementsLabelFor('activate')}` },

  get disactivateLabel(): string { return `Disactivate ${this.requirementsLabelFor('disactivate')}` },

  canActivate(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isActivable,
        log: () => `${this.nameProper} cannot be activated`
      },
      {
        expr: () => this.isActive,
        log: () => `${this.nameProper} is already active`
      },
    ], showMessage, 'activate')
  },

  async activate(): Promise<boolean> {
    if (!this.canActivate(true)) {
      return false
    }
    log(`Activating ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('activate', async () => {
      log(`You have activated ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onActivate')
      return true
    }, this.activationDelay)
    return true
  },

  async onActivate(): Promise<void> {},

  canDisactivate(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isDisactivable,
        log: () => `${this.nameProper} cannot be deactivated`
      },
      {
        expr: () => !this.isActive,
        log: () => `${this.nameProper} is already deactivated`
      },
    ], showMessage, 'disactivate')
  },

  async disactivate(): Promise<boolean> {
    if (!this.canDisactivate()) {
      return false
    }
    log(`Disactivating ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('disactivate', async () => {
      log(`You have disactivated ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onDisactivate')
      return true
    }, this.activationDelay)
    return true
  },

  async onDisactivate(): Promise<void> {},

  async toggleActivate(): Promise<boolean> {
    if (this.isActive) {
      return this.disactivate()
    }
    return this.activate()
  }
}
