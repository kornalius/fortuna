import { emit, log } from '@/utils'

export default {
  state: {
    usable: false,
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
    if (!this.isUsable) {
      if (showMessage) {
        log(`${this.name} cannot be used`)
      }
      return false
    }
    // battle item can only be used in combat
    if (!store.player.isInCombat && this.isBattle) {
      if (showMessage) {
        log(`${this.name} can only be used during combat`)
      }
      return false
    }
    // only battle item can be used in combat
    if (store.player.isInCombat && !this.isBattle) {
      if (showMessage) {
        log(`${this.name} can only be used outside of combat`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('use', showMessage));
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
