/**
 * Make the object destructable by applying damage to it until it reaches 0
 */

import random from 'lodash/random'
import { can, emit, log, LOG_WARN } from '@/utils'
import { Entity, State } from '@/entity'
import { IName } from './name'
import { IOperation } from './operation'
import { IRequirements } from './requirements'

export interface IDestructable extends IName, IOperation, IRequirements, Entity {
  state: State
  get isDestructable(): boolean
  set destructable(value: boolean)
  get isDestroyed(): boolean
  set destroyed(value: number)
  get destroyDelay(): number
  set destroyDelay(value)
  get destroyAmount(): number
  set destroyAmount(value)
  get removeWhenDestroyed(): boolean
  set removeWhenDestroyed(value)
  get destroyLabel(): string
  canDestroy(showMessage?: boolean): boolean
  destroy(): Promise<boolean>
  onDestroy(amount: number): Promise<void>
}

// @ts-ignore
export const Destructable: IDestructable = {
  state: {
    // total to be destroyed
    destructable: 0,
    // time it takes to damage object
    destroyDelay: 1,
    // destroy amount every action
    destroyAmount: 1,
    // destroyed so far
    destroyed: 0,
    // delete object when destroyed
    removeWhenDestroyed: true,
    actions: [
      (item: IDestructable) => (
        item.isDestructable
          ? {
            label: item.destroyLabel,
            key: 'destroy',
            icon: 'destroy',
            disabled: !item.canDestroy(),
            click: async () => item.destroy(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'destroy', str: 1 },
    ],
  },

  get isDestructable(): boolean { return this.state.destructable > 0 },
  set destructable(value: boolean) { this.state.destructable = value },

  get isDestroyed(): boolean { return this.state.destroyed >= this.state.destructable },
  set destroyed(value: number) { this.state.destroyed = value },

  get destroyDelay(): number { return this.state.destroyDelay },
  set destroyDelay(value) { this.state.destroyDelay = value },

  get destroyAmount(): number { return this.state.destroyAmount },
  set destroyAmount(value) { this.state.destroyAmount = value },

  get removeWhenDestroyed(): boolean { return this.state.removeWhenDestroyed },
  set removeWhenDestroyed(value) { this.state.removeWhenDestroyed = value },

  get destroyLabel(): string { return `Destroy ${this.requirementsLabelFor('destroy')}` },

  canDestroy(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isDestructable,
        log: () => `${this.nameProper} cannot be destroyed`
      },
      {
        expr: () => this.isDestroyed,
        log: () => `${this.nameProper} has already been destroyed`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot destroy this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot destroy this while in conversation'
      },
    ], showMessage, 'destroy')
  },

  async destroy(): Promise<boolean> {
    if (!this.canDestroy()) {
      return false
    }
    log(`Damaging ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('destroy', async () => {
      const dmg = random(this.destroyAmount)
      this.destroyed += dmg
      if (this.isDestroyed) {
        log(`You have destroyed ${this.nameDisplay}`, LOG_WARN, this.icon)
      } else {
        log(`You have damaged ${this.nameDisplay} by ${dmg}`, LOG_WARN, this.icon)
      }
      await emit(this, 'onDestroy', dmg)
      if (this.isDestroyed && this.removeWhenDestroyed) {
        this.remove()
      }
      return true
    }, this.destroyDelay)
    return true
  },

  async onDestroy(amount: number): Promise<void> {},
}
