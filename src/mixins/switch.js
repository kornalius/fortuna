import { emit, log } from '@/utils';

/**
 * Adds an on/off state to the object
 */

export default {
  state: {
    // is the object off
    off: true,
    // the object is usable by default
    usable: true,
  },

  get isOn() { return !this.state.off },
  set isOn(value) { return this.state.off = !value },

  get isOff() { return this.state.off },
  set isOff(value) { return this.state.off = value },

  async toggle() {
    if (!this.canUse(true)) {
      log(`You cannot toggle the ${this.name.toLowerCase()}`)
      return false
    }
    this.isOn = !this.isOn
    await emit.call(this, 'onUse')
    return true
  },

  async onUse() {
    store.game.playSound('switch')
  },
}
