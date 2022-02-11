import { checkSoftware, emit, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    authenticated: false,
    actions: [
      item => (
        item.canAuthenticate()
          ? {
            label: 'Authenticate',
            key: 'authenticate',
            icon: 'ph:password-bold',
            disabled: false,
            click: async () => item.authenticate(),
          }
          : undefined
      ),
    ],
  },

  get isAuthenticated() { return this.state.authenticated },
  set authenticated(value) { this.state.authenticated = value },

  get isAuthenticating() { return store.player.installedAuthenticator?.isBusy || false },
  set authenticating(value) { this.setBusy(store.player.installedAuthenticator, value) },

  canAuthenticate(showMessage) {
    if (this.isAuthenticated) {
      if (showMessage) {
        log(`You are already authenticated on ${this.name.toLowerCase()}`)
      }
      return false
    }
    if (this.isProtected) {
      if (showMessage) {
        log(`${this.name} is protected`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to ${this.name.toLowerCase()}`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedAuthenticator, showMessage && 'authenticator')
  },

  async authenticate() {
    if (!this.canAuthenticate) {
      return false
    }
    this.authenticating = true
    log(`Authenticating on ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.authenticating = false
        this.authenticated = true
        log(`You have successfully authenticated on ${this.name.toLowerCase()}`)
        await emit.call(this, 'onAuthenticate')
        resolve(true)
      }, operationTimeout(this.version))
    })
  },

  async onAuthenticate() {},
}
