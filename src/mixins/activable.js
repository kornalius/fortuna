import { emit, log } from '@/utils'

export default {
  state: {
    activable: false,
    disactivable: false,
    activationDelay: 1,
    active: false,
    actions: [
      item => (
        item.canActivate()
          ? {
            label: 'Activate',
            key: 'activate',
            icon: 'mdi:toggle-switch-outline',
            disabled: false,
            click: async () => item.activate(),
          }
          : undefined
      ),
      item => (
        item.canDisactivate()
          ? {
            label: 'Deactivate',
            key: 'disactivate',
            icon: 'mdi:toggle-switch-off-outline',
            disabled: false,
            click: async () => item.disactivate(),
          }
          : undefined
      ),
    ],
  },

  get isActivable() { return this.state.activable },
  set activable(value) { this.state.activable = value },

  get isDisactivable() { return this.state.disactivable },
  set disactivable(value) { this.state.disactivable = value },

  get isActive() { return this.state.active },
  set active(value) { this.state.active = value },

  get activationDelay() { return this.state.activationDelay },
  set activationDelay(value) { this.state.activationDelay = value },

  canActivate(showMessage) {
    if (!this.isActivable) {
      if (showMessage) {
        log(`${this.name} cannot be activated`)
      }
      return false
    }
    if (this.isActive) {
      if (showMessage) {
        log(`${this.name} is already active`)
      }
      return false
    }
    return true
  },

  async activate() {
    if (!this.canActivate()) {
      return false
    }
    log(`Activating ${this.name.toLowerCase()}...`)
    await this.operate('activate', async () => {
      log(`You have activated ${this.name.toLowerCase()}`)
      await emit.call(this, 'onActivate')
    }, this.activationDelay)
    return true
  },

  canDisactivate(showMessage) {
    if (!this.isDisactivable) {
      if (showMessage) {
        log(`${this.name} cannot be deactivated`)
      }
      return false
    }
    if (!this.isActive) {
      if (showMessage) {
        log(`${this.name} is already deactivated`)
      }
      return false
    }
    return true
  },

  async disactivate() {
    if (!this.canDisactivate()) {
      return false
    }
    log(`Disactivating ${this.name.toLowerCase()}...`)
    await this.operate('disactivate', async () => {
      log(`You have disactivated ${this.name.toLowerCase()}`)
      await emit.call(this, 'onActivate')
    }, this.activationDelay)
    return true
  },

  async onActivate() {},

  async toggleActivate() {
    if (this.isActive) {
      return this.disactivate()
    }
    return this.activate()
  },
}
