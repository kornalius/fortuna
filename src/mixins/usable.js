import { emit, log } from '@/utils'

export default {
  state: {
    usable: true,
    actions: [
      item => (
        item.canUse()
          ? {
            label: 'Use',
            key: 'use',
            icon: 'fa-solid:hand-pointer',
            disabled: false,
            click: async () => item.use(),
          }
          : undefined
      ),
    ],
  },

  get isUsable() { return this.state.usable },
  set usable(value) { this.state.usable = value },

  canUse(showMessage) {
    if (!this.isUsable) {
      if (showMessage) {
        log(`${this.name} cannot be used`)
      }
      return false
    }
    return true
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
