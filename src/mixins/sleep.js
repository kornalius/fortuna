import { can, emit } from '@/utils'

/**
 * Makes an object sleeping
 */

export default {
  state: {
    // is the object sleeping or not
    sleeping: false,
  },

  get isSleeping() { return this.state.sleeping },
  set sleeping(value) { this.state.sleeping = value },

  canSleep(showMessage) {
    return can(this, [
      {
        expr: () => this.isSleeping,
        log: `${this.name} is already asleep`,
      },
      {
        expr: () => !this.location.canSleepOnItems().length > 0,
          log: 'No suitable furniture to go to sleep',
      },
    ], showMessage)
  },

  async sleep() {
    if (!this.canSleep(true)) {
      return false
    }
    this.sleeping = true
    await emit.call(this, 'onSleep')
    return true
  },

  async onSleep() {},

  canWake(showMessage) {
    return can(this, [
      {
        expr: () => !this.isSleeping,
        log: `${this.name} is not sleeping`,
      },
    ], showMessage)
  },

  async wake() {
    if (!this.canWake(true)) {
      return false
    }
    this.sleeping = false
    await emit.call(this, 'onWake')
    return true
  },

  async onWake() {},
}
