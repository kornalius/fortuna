import { emit, log } from '@/utils';

export default {
  state: {
    // total to consume
    consumable: 0,
    consumeDelay: 1,
    consumed: 0
  },

  get isConsumable() { return this.state.consumable > 0 },
  set consumable(value) { this.state.consumable = value },

  get isConsumed() { return this.state.consumed >= this.state.consumable },
  set consumed(value) { this.state.consumed = value },

  canConsume(showMessage) {
    if (this.isConsumed) {
      if (showMessage) {
        log(`${this.name} has already been consumed`)
      }
      return false
    }
    return true
  },

  async consume() {
    if (!this.canConsume()) {
      return false
    }
    log(`Consuming ${this.name.toLowerCase()}...`)
    await this.operate('consume', async () => {
      log(`You have eaten ${this.name.toLowerCase()}`)
      await emit.call(this, 'onConsume')
    }, this.consumeDelay)
    return true
  },

  async onConsume() { }
}
