/**
 * Makes an object pullable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameData } from './name'
import { IIcon, IIconData } from './icon'
import { IOperation, IOperationData } from './operation'
import { IRequirements, IRequirementsData } from './requirements'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IPushableData extends
  INameData,
  IIconData,
  IRequirementsData,
  IOperationData,
  IActionsData
{
  // is the object pushable
  pushable?: boolean
  // time it takes to push object
  pushDelay?: number
  // has the object been pushed
  pushed?: boolean
  onPush?: () => Promise<void>
}

export interface IPushable extends
  IName,
  IIcon,
  IRequirements,
  IOperation,
  IActions
{
  state: State
  get isPushable(): boolean
  set pushable(value: boolean)
  get isPushed(): boolean
  set pushed(value: boolean)
  get pushDelay(): number
  set pushDelay(value)
  get pushLabel(): string
  canPush(showMessage?: boolean): boolean
  push(): Promise<boolean>
  onPush(): Promise<void>
}

// @ts-ignore
export const Pushable: IPushable = {
  state: {
    pushable: false,
    pushDelay: 1,
    pushed: false,
    actions: [
      (item: IPushable): IDropdownItem | undefined => (
        item.isPushable && !item.isPushed
          ? {
            label: item.pushLabel,
            key: 'push',
            icon: 'push',
            disabled: !item.canPush(),
            click: () => item.push(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'push', str: 1 }
    ],
  } as IPushableData,

  get isPushable(): boolean { return this.state.pushable },
  set pushable(value: boolean) { this.state.pushable = value },

  get isPushed(): boolean { return this.state.pushed },
  set pushed(value: boolean) { this.state.pushed = value },

  get pushDelay(): number { return this.state.pushDelay },
  set pushDelay(value) { this.state.pushDelay = value },

  get pushLabel(): string { return `Push ${this.requirementsLabelFor('push')}` },

  canPush(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isPushable,
        log: () => `${this.nameProper} cannot be pushed`
      },
      {
        expr: () => this.isPushed,
        log: () => `${this.nameProper} is already pushed`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot push this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot push this while in conversation'
      }
    ], showMessage, 'push')
  },

  async push(): Promise<boolean> {
    if (!this.canPush(true)) {
      return false
    }
    log(`Pushing ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('push', async () => {
      log(`You have pushed ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onPush')
      return true
    }, this.pushDelay)
    return true
  },

  async onPush(): Promise<void> {},
}
