import { emit, log } from '@/utils'

export default {
  state: {
    pullable: false,
    pullDelay: 1,
    pulled: false,
    actions: [
      item => (
        item.canPull()
          ? {
            label: 'Push',
            key: 'pull',
            icon: 'system-uicons:push-left',
            disabled: false,
            click: async () => item.pull(),
          }
          : undefined
      ),
    ],
  },

  get isPushable() { return this.state.pullable },
  set pullable(value) { this.state.pullable = value },

  get isPulled() { return this.state.pulled },
  set pulled(value) { this.state.pulled = value },

  get pullDelay() { return this.state.pullDelay },
  set pullDelay(value) { this.state.pullDelay = value },

  canPull(showMessage) {
    if (!this.isPushable) {
      if (showMessage) {
        log(`${this.name} cannot be pulled`)
      }
      return false
    }
    if (this.isPulled) {
      if (showMessage) {
        log(`${this.name} is already pulled`)
      }
      return false
    }
    return !(this.checkRequirements && !this.checkRequirements('pull', showMessage));
  },

  async pull() {
    if (!this.canPull()) {
      return false
    }
    log(`Pulling ${this.name.toLowerCase()}...`)
    await this.operate('pull', async () => {
      log(`You have pulled ${this.name.toLowerCase()}`)
      await emit.call(this, 'onPull')
    }, this.pullDelay)
    return true
  },

  async onPull() {},
}
