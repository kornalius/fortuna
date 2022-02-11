import { checkSoftware, emit, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    disconnecting: false,
    actions: [
      item => (
        item.canConnect()
          ? {
            label: 'Connect',
            key: 'connect',
            icon: 'mdi:lan-connect',
            disabled: false,
            click: async () => item.connect(),
          }
          : undefined
      ),
      item => (
        item.canDisconnect()
          ? {
            label: 'Disconnect',
            key: 'disconnect',
            icon: 'mdi:lan-disconnect',
            disabled: false,
            click: async () => item.disconnect(),
          }
          : undefined
      ),
    ],
  },

  get isConnecting() { return store.player.installedConnector?.isBusy || false },
  set connecting(value) { this.setBusy(store.player.installedConnector, value) },

  get isConnected() { return store.player.server === this },
  get isDisconnected() { return store.player.server !== this },

  get isDisconnecting() { return this.state.disconnecting },
  set disconnecting(value) { this.state.disconnecting = value },

  canConnect(showMessage) {
    if (!this.isScanned) {
      if (showMessage) {
        log(`${this.name} needs to be scanned for opened ports first`)
      }
      return false
    }
    if (this.isConnected) {
      if (showMessage) {
        log(`You are already connected to ${this.name.toLowerCase()}`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedConnector, showMessage && 'connector')
  },

  async connect() {
    if (!this.canConnect) {
      return false
    }
    this.connecting = true
    log(`Connecting to ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.connecting = false
        this.clear()
        store.player.server = this
        this.visited += 1
        log(`You have successfully connected to ${this.name.toLowerCase()}`)
        await emit.call(this, 'onConnect')
        resolve(true)
      }, operationTimeout(this.version))
    })
  },

  async onConnect() {},

  canDisconnect(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is locked while an operation is running on it`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You are not connected to ${this.name.toLowerCase()}`)
      }
      return false
    }
    return true
  },

  async disconnect() {
    if (!this.canDisconnect) {
      return false
    }
    this.disconnecting = true
    log(`Disconnecting from ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.disconnecting = false
        store.player.server = null
        log(`You have successfully disconnected from ${this.name}`)
        await emit.call(this, 'onDisconnect')
        resolve(true)
      }, operationTimeout(this.version))
    })
  },

  async onDisconnect() {},
}
