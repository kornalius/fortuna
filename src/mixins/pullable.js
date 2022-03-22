import { can, emit, log } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object pullable
 */

export default {
  state: {
    // is the object pullable
    pullable: false,
    // time it takes to pull object
    pullDelay: 1,
    // has the object been pulled
    pulled: false,
    actions: [
      item => (
        item.isPullable && !item.isPulled
          ? {
            label: item.pullLabel,
            key: 'pull',
            icon: 'pull',
            disabled: !item.canPull(),
            click: async () => item.pull(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'pull', str: 1 },
    ],
  },

  get isPullable() { return this.state.pullable },
  set pullable(value) { this.state.pullable = value },

  get isPulled() { return this.state.pulled },
  set pulled(value) { this.state.pulled = value },

  get pullDelay() { return this.state.pullDelay },
  set pullDelay(value) { this.state.pullDelay = value },

  get pullLabel() {
    return `Pull ${this.requirementsLabelFor('pull')}`
  },

  canPull(showMessage) {
    return can(this, [
      {
        expr: () => !this.isPullable,
        log: () => `${this.name} cannot be pulled`
      },
      {
        expr: () => this.isPulled,
        log: () => `${this.name} is already pulled`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot pull this while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot pull this while in conversation'
      },
    ], showMessage, 'pull')
  },

  async pull() {
    if (!this.canPull()) {
      return false
    }
    log(`Pulling ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    await this.operate('pull', async () => {
      log(`You have pulled ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit.call(this, 'onPull')
    }, this.pullDelay)
    return true
  },

  async onPull() {},
}
