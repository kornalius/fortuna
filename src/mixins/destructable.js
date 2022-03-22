import random from 'lodash/random'
import { can, emit, log, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Make the object destructable by applying damage to it until it reaches 0
 */

export default {
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
      item => (
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

  get isDestructable() { return this.state.destructable > 0 },
  set destructable(value) { this.state.destructable = value },

  get isDestroyed() { return this.state.destroyed >= this.state.destructable },
  set destroyed(value) { this.state.destroyed = value },

  get destroyDelay() { return this.state.destroyDelay },
  set destroyDelay(value) { this.state.destroyDelay = value },

  get destroyAmount() { return this.state.destroyAmount },
  set destroyAmount(value) { this.state.destroyAmount = value },

  get removeWhenDestroyed() { return this.state.removeWhenDestroyed },
  set removeWhenDestroyed(value) { this.state.removeWhenDestroyed = value },

  get destroyLabel() {
    return `Destroy ${this.requirementsLabelFor('destroy')}`
  },

  canDestroy(showMessage) {
    return can(this, [
      {
        expr: () => !this.isDestructable,
        log: () => `${this.name} cannot be destroyed`
      },
      {
        expr: () => this.isDestroyed,
        log: () => `${this.name} has already been destroyed`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot destroy this while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot destroy this while in conversation'
      },
    ], showMessage, 'destroy')
  },

  async destroy() {
    if (!this.canDestroy()) {
      return false
    }
    log(`Damaging ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    await this.operate('destroy', async () => {
      const dmg = random(this.destroyAmount)
      this.destroyed += dmg
      if (this.isDestroyed) {
        log(`You have destroyed ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      } else {
        log(`You have damaged ${this.name.toLowerCase()} by ${dmg}`, LOG_WARN, this.icon)
      }
      await emit.call(this, 'onDestroy', dmg)
      if (this.isDestroyed && this.removeWhenDestroyed) {
        this.remove()
      }
    }, this.destroyDelay)
    return true
  },

  async onDestroy(amount) {}
}
