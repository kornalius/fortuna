import { emit, log } from '@/utils';

export default {
  state: {
    activable: false,
    disactivable: false,
    activationDelay: 1,
    active: false,
  },

  get isActivable() { return this.state.activable },
  set activable(value) { this.state.activable = value },

  get isDisactivable() { return this.state.disactivable },
  set disactivable(value) { this.state.disactivable = value },

  get isActive() { return this.state.active },
  set active(value) { this.state.active = value },

  canActivate(showMessage) {
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
      await emit.call(this, 'onExamine')
    }, this.activationDelay)
    return true
  },

  canDisactivate(showMessage) {
    if (!this.isActive) {
      if (showMessage) {
        log(`${this.name} is already disactivated`)
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
      await emit.call(this, 'onExamine')
    }, this.activationDelay)
    return true
  },

  async toggleActivate() {
    if (this.isActive) {
      return this.disactivate()
    }
    return this.activate()
  },
}
