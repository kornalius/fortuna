import { emit, log, LOG_WARN } from '@/utils'

/**
 * Adds an on/off state to the object
 */

export default {
  state: {
    // is the object off
    off: true,
    // the object is usable by default
    usable: true,
    // if the icon should be suffixed with switch state -on or -off
    switchIconSuffix: true,
  },

  get isOn() { return !this.state.off },
  set isOn(value) { return this.state.off = !value },

  get isOff() { return this.state.off },
  set isOff(value) { return this.state.off = value },

  get switchIconSuffix() { return this.state.switchIconSuffix },
  set switchIconSuffix(value) { this.state.switchIconSuffix = value },

  get iconSuffix() {
    if (!this.switchIconSuffix) {
      return this.state.iconSuffix
    }
    return `${this.state.iconSuffix || ''}-${this.isOn ? 'on' : 'off'}`
  },

  async toggle() {
    if (!this.canUse(true)) {
      log(`You cannot toggle the ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      return false
    }
    store.game.playSound('switch')
    this.isOn = !this.isOn
    await emit.call(this, 'onUse')
    return true
  },

  async onUse() {
    await this.toggle()
  },

  async onExamine() {
    log([
      this.isOn ? 'It is ON' : 'It is OFF',
    ], 0, this.icon)
    return super.onExamine()
  }
}
