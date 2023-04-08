/**
 * Make object consumable
 */

import random from 'lodash/random'
import { can, emit, log, LOG_WARN } from '@/utils'
import { State, Entity } from '@/entity'
import { IName } from './name'
import { IIcon } from './icon'
import { IOperation } from './operation'
import { IRequirements } from './requirements'

export interface IConsumable extends IName, IIcon, IOperation, IRequirements, Entity {
  state: State
  get isConsumable(): boolean
  set consumable(value: boolean)
  get isConsumed(): boolean
  get consumed(): number
  set consumed(value: number)
  get consumeAmount(): number
  set consumeAmount(value)
  get consumeDelay(): number
  set consumeDelay(value)
  get removeWhenConsumed(): boolean
  set removeWhenConsumed(value)
  get consumeLabel(): string
  canConsume(showMessage?: boolean): boolean
  consume(): Promise<boolean>
  onConsume(amount: number): Promise<void>
}

// @ts-ignore
export const Consumable: IConsumable = {
  state: {
    // total to consume
    consumable: 0,
    // time it takes to consume
    consumeDelay: 1,
    // to be consumed every action
    consumeAmount: 1,
    // consumed so far
    consumed: 0,
    // delete the object once consumed
    removeWhenConsumed: true,
    actions: [
      (item: IConsumable) => (
        item.isConsumable
          ? {
            label: item.consumeLabel,
            key: 'consume',
            icon: 'consume',
            disabled: !item.canConsume(),
            click: async () => item.consume(),
          }
          : undefined
      ),
    ],
  },

  get isConsumable(): boolean { return this.state.consumable > 0 },
  set consumable(value: boolean) { this.state.consumable = value },

  get isConsumed(): boolean { return this.state.consumed >= this.state.consumable },
  get consumed(): number { return this.state.consumed },
  set consumed(value: number) { this.state.consumed = value },

  get consumeAmount(): number { return this.state.consumeAmount },
  set consumeAmount(value) { this.state.consumeAmount = value },

  get consumeDelay(): number { return this.state.consumeDelay },
  set consumeDelay(value) { this.state.consumeDelay = value },

  get removeWhenConsumed(): boolean { return this.state.removeWhenConsumed },
  set removeWhenConsumed(value) { this.state.removeWhenConsumed = value },

  get consumeLabel(): string { return `Consume ${this.requirementsLabelFor('consume')}` },

  canConsume(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isConsumable,
        log: () => `${this.name} cannot not consumable`
      },
      {
        expr: () => this.isConsumed,
        log: () => `${this.name} has already been fully consumed`
      },
    ], showMessage, 'consume')
  },

  async consume(): Promise<boolean> {
    if (!this.canConsume()) {
      return false
    }
    log(`Consuming ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    await this.operate('consume', async () => {
      const dmg = random(this.consumeAmount)
      this.consumed += dmg
      if (this.isConsumed) {
        log(`You have fully consumed ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      } else {
        log(`You have consumed ${dmg} from ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      }
      await emit(this, 'onConsume', dmg)
      if (this.isConsumed && this.removeWhenConsumed) {
        this.remove()
      }
      return true
    }, this.consumeDelay)
    return true
  },

  async onConsume(amount: number): Promise<void> {},
}
