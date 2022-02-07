import { log } from '@/utils'

export default {
  state: {
    usable: true,
    actions: [
      item => (
        item.isUsable
          ? {
            label: 'Use',
            key: 'use',
            icon: 'fa-solid:hand-pointer',
            disabled: false,
            click: () => item.use(),
          }
          : undefined
      ),
    ],
  },

  get isUsable() { return this.state.usable },
  set usable(value) { this.state.usable = value },

  get canUse() {
    return true
  },

  use() {
    if (!this.canUse) {
      return false
    }
    if (!this.isUsable) {
      log(`You cannot use the ${this.name}`)
      return false
    }
    log(`You use the ${this.name}`)
    return true
  },
}
