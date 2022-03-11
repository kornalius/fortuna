import { can, emit, log } from '@/utils'

/**
 * Allow item to be activated or disactivated
 */

export default {
  state: {
    // is the item activable
    activable: false,
    // can the item be disactivated
    disactivable: false,
    // time it takes to activate or disactivate
    activationDelay: 1,
    // is the item active or not
    active: false,
    actions: [
      item => (
        item.isActivable && !item.isActive
        ? {
            label: item.activateLabel,
            key: 'activate',
            icon: 'activate',
            disabled: !item.canActivate(),
            click: async () => item.activate(),
          }
        : undefined
      ),
      item => (
        item.isDisactivable && item.isActive
          ? {
            label: item.disactivateLabel,
            key: 'disactivate',
            icon: 'disactivate',
            disabled: !item.canDisactivate(),
            click: async () => item.disactivate(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'activate', dex: 1 },
      { name: 'disactivate', dex: 1 },
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

  get activateLabel() {
    return `Activate ${this.requirementsLabelFor('activate')}`
  },

  get disactivateLabel() {
    return `Disactivate ${this.requirementsLabelFor('disactivate')}`
  },

  canActivate(showMessage) {
    return can(this, [
      {
        expr: () => !this.isActivable,
        log: () => `${this.name} cannot be activated`
      },
      {
        expr: () => this.isActive,
        log: () => `${this.name} is already active`
      },
    ], showMessage, 'activate')
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
    return can(this, [
      {
        expr: () => !this.isDisactivable,
        log: `${this.name} cannot be deactivated`
      },
      {
        expr: () => !this.isActive,
        log: `${this.name} is already deactivated`
      },
    ], showMessage, 'disactivate')
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
