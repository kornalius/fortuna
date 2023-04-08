/**
 * Makes an object pullable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IOperation } from './operation'
import { IRequirements } from './requirements'

export interface IPushable extends IName, IIcon, IRequirements, IOperation {
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
    // is the object pushable
    pushable: false,
    // time it takes to push object
    pushDelay: 1,
    // has the object been pushed
    pushed: false,
    actions: [
      (item: IPushable) => (
        item.isPushable && !item.isPushed
          ? {
            label: item.pushLabel,
            key: 'push',
            icon: 'push',
            disabled: !item.canPush(),
            click: async () => item.push(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'push', str: 1 }
    ],
  },

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
