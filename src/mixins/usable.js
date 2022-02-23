import { emit, log } from '@/utils'

export default {
  state: {
    usable: false,
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
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('use', showMessage));
  },

  async use() {
    if (!this.canUse(true)) {
      return false
    }
    log(`You use the ${this.name.toLowerCase()}`)
    await emit.call(this, 'onUse')
    return true
  },

  async onUse() {},
}
