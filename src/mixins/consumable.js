import random from 'lodash/random'
import { can, emit, log } from '@/utils'

export default {
  state: {
    // total to consume
    consumable: 0,
    consumeDelay: 1,
    // to be consumed every action
    consumeAmount: 1,
    // consumed so far
    consumed: 0,
    removeWhenConsumed: true,
    actions: [
      item => (
        item.isConsumable
          ? {
            label: item.consumeLabel,
            key: 'consume',
            icon: 'emojione-monotone:fork-and-knife',
            disabled: !item.canConsume(),
            click: async () => item.consume(),
          }
          : undefined
      ),
    ],
  },

  get isConsumable() { return this.state.consumable > 0 },
  set consumable(value) { this.state.consumable = value },

  get isConsumed() { return this.state.consumed >= this.state.consumable },
  set consumed(value) { this.state.consumed = value },

  get consumeAmount() { return this.state.consumeAmount },
  set consumeAmount(value) { this.state.consumeAmount = value },

  get consumeDelay() { return this.state.consumeDelay },
  set consumeDelay(value) { this.state.consumeDelay = value },

  get removeWhenConsumed() { return this.state.removeWhenConsumed },
  set removeWhenConsumed(value) { this.state.removeWhenConsumed = value },

  get consumeLabel() {
    return `Consume ${this.requirementsLabelFor('consume')}`
  },

  canConsume(showMessage) {
    return can(this, [
      {
        expr: () => this.isConsumable,
        log: `${this.name} cannot not consumable`
      },
      {
        expr: () => this.isConsumed,
        log: `${this.name} has already been fully consumed`
      },
    ], showMessage, 'consume')
  },

  async consume() {
    if (!this.canConsume()) {
      return false
    }
    log(`Consuming ${this.name.toLowerCase()}...`)
    await this.operate('consume', async () => {
      const dmg = random(this.consumeAmount)
      this.consumed += dmg
      if (this.isConsumed) {
        log(`You have fully consumed ${this.name.toLowerCase()}`)
      } else {
        log(`You have consumed ${dmg} from ${this.name.toLowerCase()}`)
      }
      await emit.call(this, 'onConsume', dmg)
      if (this.isConsumed && this.removeWhenConsumed) {
        this.remove()
      }
    }, this.consumeDelay)
    return true
  },

  async onConsume(amount) {}
}
