import { can, emit, log } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object usable
 */

export default {
  state: {
    // is the object usable
    usable: false,
    // limit to the number of uses allowed, -1 means can be used as many times as wanted
    uses: -1,
    actions: [
      item => (
        item.isUsable
          ? {
            label: item.useLabel,
            key: 'use',
            icon: 'fa-solid:hand-pointer',
            disabled: !item.canUse(),
            click: async () => item.use(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'use', dex: 1 },
    ],
  },

  get isUsable() { return this.state.usable },
  set usable(value) { this.state.usable = value },

  get uses() { return this.state.uses },
  set uses(value) { this.state.uses = value },

  get hasUnlimitedUses() { return this.uses === -1 },

  get useLabel() {
    return `Use ${this.requirementsLabelFor('use')}`
  },

  canUse(showMessage) {
    return can(this, [
      {
        expr: () => !this.isUsable,
        log: () => `${this.name} cannot be used`
      },
      // battle item can only be used in combat
      {
        expr: () => !store.player.isInCombat && this.isBattle,
        log: () => `${this.name} can only be used during combat`
      },
      // only battle item can be used in combat
      {
        expr: () => store.player.isInCombat && !this.isBattle,
        log: () => `${this.name} can only be used outside of combat`
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot use this while in conversation'
      },
    ], showMessage, 'use')
  },

  async use() {
    if (!this.canUse(true)) {
      return false
    }

    log(`You use the ${this.name.toLowerCase()}`)
    await emit.call(this, 'onUse')

    if (!this.hasUnlimitedUses) {
      this.uses -= 1
      if (this.uses <= 0) {
        this.remove()
      }
    }
    return true
  },

  async onUse() {},
}
