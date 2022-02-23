import random from 'lodash/random'
import { emit, log } from '@/utils'

export default {
  state: {
    // total to be destroyed
    destructable: 0,
    destroyDelay: 1,
    // destroy amount every action
    destroyAmount: 1,
    // destroyed so far
    destroyed: 0,
    removeWhenDestroyed: true,
    actions: [
      item => (
        item.isDestructable
          ? {
            label: item.destroyLabel,
            key: 'destroy',
            icon: 'whh:breakable',
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
    if (this.isDestructable) {
      if (showMessage) {
        log(`${this.name} cannot be destroyed`)
      }
      return false
    }
    if (this.isDestroyed) {
      if (showMessage) {
        log(`${this.name} has already been destroyed`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('destroy', showMessage));
  },

  async destroy() {
    if (!this.canDestroy()) {
      return false
    }
    log(`Damaging ${this.name.toLowerCase()}...`)
    await this.operate('destroy', async () => {
      const dmg = random(this.destroyAmount)
      this.destroyed += dmg
      if (this.isDestroyed) {
        log(`You have destroyed ${this.name.toLowerCase()}`)
      } else {
        log(`You have damaged ${this.name.toLowerCase()} by ${dmg}`)
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
