/**
 * Makes an object pullable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IRequirements } from './requirements'
import { IOperation } from './operation'

export interface IPullable extends IName, IIcon, IRequirements, IOperation {
  state: State
  get isPullable(): boolean
  set pullable(value: boolean)
  get isPulled(): boolean
  set pulled(value: boolean)
  get pullDelay(): number
  set pullDelay(value)
  get pullLabel(): string
  canPull(showMessage?: boolean): boolean
  pull(): Promise<boolean>
  onPull(): Promise<void>
}

// @ts-ignore
export const Pullable: IPullable = {
  state: {
    // is the object pullable
    pullable: false,
    // time it takes to pull object
    pullDelay: 1,
    // has the object been pulled
    pulled: false,
    actions: [
      (item: IPullable) => (
        item.isPullable && !item.isPulled
          ? {
            label: item.pullLabel,
            key: 'pull',
            icon: 'pull',
            disabled: !item.canPull(),
            click: async () => item.pull(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'pull', str: 1 },
    ],
  },

  get isPullable(): boolean { return this.state.pullable },
  set pullable(value: boolean) { this.state.pullable = value },

  get isPulled(): boolean { return this.state.pulled },
  set pulled(value: boolean) { this.state.pulled = value },

  get pullDelay(): number { return this.state.pullDelay },
  set pullDelay(value) { this.state.pullDelay = value },

  get pullLabel(): string { return `Pull ${this.requirementsLabelFor('pull')}` },

  canPull(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isPullable,
        log: () => `${this.nameProper} cannot be pulled`
      },
      {
        expr: () => this.isPulled,
        log: () => `${this.nameProper} is already pulled`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot pull this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot pull this while in conversation'
      },
    ], showMessage, 'pull')
  },

  async pull(): Promise<boolean> {
    if (!this.canPull(true)) {
      return false
    }
    log(`Pulling ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('pull', async () => {
      log(`You have pulled ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onPull')
      return true
    }, this.pullDelay)
    return true
  },

  async onPull(): Promise<void> {},
}
