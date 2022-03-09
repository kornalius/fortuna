import { can, emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    pullable: false,
    pullDelay: 1,
    pulled: false,
    actions: [
      item => (
        item.isPullable && !item.isPulled
          ? {
            label: item.pullLabel,
            key: 'pull',
            icon: 'system-uicons:push-left',
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
        log: `${this.name} cannot be pulled`
      },
      {
        expr: () => this.isPulled,
        log: `${this.name} is already pulled`
      },
      {
        expr: () => store.player.isInCombat,
        log: 'You cannot pull this while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: 'You cannot pull this while in conversation'
      },
    ], showMessage, 'pull')
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
