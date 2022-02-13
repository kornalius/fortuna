import { emit, log } from '@/utils'

export default {
  state: {
    pushable: false,
    pushDelay: 1,
    pushed: false,
    actions: [
      item => (
        item.canPush()
          ? {
            label: 'Push',
            key: 'push',
            icon: 'system-uicons:push-right',
            disabled: false,
            click: async () => item.push(),
          }
          : undefined
      ),
    ],
  },

  get isPushable() { return this.state.pushable },
  set pushable(value) { this.state.pushable = value },

  get isPushed() { return this.state.pushed },
  set pushed(value) { this.state.pushed = value },

  get pushDelay() { return this.state.pushDelay },
  set pushDelay(value) { this.state.pushDelay = value },

  canPush(showMessage) {
    if (!this.isPushable) {
      if (showMessage) {
        log(`${this.name} cannot be pushed`)
      }
      return false
    }
    if (this.isPushed) {
      if (showMessage) {
        log(`${this.name} is already pushed`)
      }
      return false
    }
    return true
  },

  async push() {
    if (!this.canPush()) {
      return false
    }
    log(`Pushing ${this.name.toLowerCase()}...`)
    await this.operate('push', async () => {
      log(`You have pushed ${this.name.toLowerCase()}`)
      await emit.call(this, 'onPush')
    }, this.pushDelay)
    return true
  },

  async onPush() {},
}
