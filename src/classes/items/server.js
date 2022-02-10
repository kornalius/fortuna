import Item from './item'
import { store } from '@/store'
import { log, operationTimeout, checkSoftware } from '@/utils'

export default class Server extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Server',
      icon: 'whh:server',
      version: 1,
      disconnecting: false,
      pickable: false,
      usable: false,
      type: null,
      protected: false,
      scanned: false,
      authenticated: false,
      display: [],
      buffer: [],
      actions: [
        item => (
          item.canScan()
            ? {
              label: 'Scan',
              key: 'scan',
              icon: 'mdi:cube-scan',
              disabled: false,
              click: async () => item.scan(),
            }
            : undefined
        ),
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
        item => (
          item.canCrack()
            ? {
              label: 'Crack password',
              key: 'crack',
              icon: 'cib:hackaday',
              disabled: false,
              click: async () => item.crack(),
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
      ...data,
    })
  }

  get isServer() { return true }

  get version() { return this.state.version }
  set version(value) { this.state.version = value }

  get isScanned() { return this.state.scanned }
  set scanned(value) { this.state.scanned = value }

  get isScanning() { return store.player.installedScanner?.isBusy || false }
  set scanning(value) { this.setBusy(store.player.installedScanner, value) }

  get isAuthenticated() { return this.state.authenticated }
  set authenticated(value) { this.state.authenticated = value }

  get isAuthenticating() { return store.player.installedAuthenticator?.isBusy || false }
  set authenticating(value) { this.setBusy(store.player.installedAuthenticator, value) }

  get isProtected() { return this.state.protected }
  set protected(value) { this.state.protected = value }

  get isCracking() { return store.player.installedCracker?.isBusy || false }
  set cracking(value) { this.setBusy(store.player.installedCracker, value) }

  get isConnecting() { return store.player.installedConnector?.isBusy || false }
  set connecting(value) { this.setBusy(store.player.installedConnector, value) }

  get isConnected() { return store.player.server === this }
  get isDisconnected() { return store.player.server !== this }

  get isDisconnecting() { return this.state.disconnecting }
  set disconnecting(value) { this.state.disconnecting = value }

  get isBusy() {
    return this.isScanning
      || this.isConnecting
      || this.isDisconnecting
      || this.isAuthenticating
      || this.isCracking
  }

  get display() { return this.state.display }
  set display(value) { this.state.display = value }

  get buffer() { return this.state.buffer }
  set buffer(value) { this.state.buffer = value }

  canScan(showMessage) {
    if (this.isScanned) {
      if (showMessage) {
        log(`Server ${this.name} has already been scanned`)
      }
      return false
    }
    if (this.isConnected) {
      if (showMessage) {
        log(`You need to be disconnected from ${this.name} to perform a port scan`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedScanner, showMessage && 'scanner')
  }

  canConnect(showMessage) {
    if (!this.isScanned) {
      if (showMessage) {
        log(`Server ${this.name} needs to be scanned for opened ports first`)
      }
      return false
    }
    if (this.isConnected) {
      if (showMessage) {
        log(`You are already connected to the server ${this.name}`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedConnector, showMessage && 'connector')
  }

  canAuthenticate(showMessage) {
    if (this.isAuthenticated) {
      if (showMessage) {
        log(`You are already authenticated on server ${this.name}`)
      }
      return false
    }
    if (this.isProtected) {
      if (showMessage) {
        log(`The server ${this.name} is protected`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to the server ${this.name}`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedAuthenticator, showMessage && 'authenticator')

  }

  canDisconnect(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is locked while an operation is running on it`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You are not connected to the server ${this.name}`)
      }
      return false
    }
    return true
  }

  canCrack(showMessage) {
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to the server ${this.name} first`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedCracker, showMessage && 'cracker')
  }

  async scan() {
    if (!this.canScan(true)) {
      return false
    }
    this.scanning = true
    log(`Scanning server ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.scanning = false
        this.scanned = true
        log(`You have successfully scanned the server ${this.name}`)
        resolve(true)
      }, operationTimeout(this.version))
    })
  }

  async connect() {
    if (!this.canConnect) {
      return false
    }
    this.connecting = true
    log(`Connecting to the server ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.connecting = false
        this.clear()
        store.player.server = this
        log(`You have successfully connected to the server ${this.name}`)
        resolve(true)
      }, operationTimeout(this.version))
    })
  }

  async disconnect() {
    if (!this.canDisconnect) {
      return false
    }
    this.disconnecting = true
    log(`Disconnecting from the server ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.disconnecting = false
        store.player.server = null
        log(`You have successfully disconnected from the server ${this.name}`)
        resolve(true)
      }, operationTimeout(this.version))
    })
  }

  async authenticate() {
    if (!this.canAuthenticate) {
      return false
    }
    this.authenticating = true
    log(`Authenticating on server ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.authenticating = false
        this.authenticated = true
        log(`You have successfully authenticated the server ${this.name}`)
        resolve(true)
      }, operationTimeout(this.version))
    })
  }

  async crack() {
    if (!this.canCrack) {
      return false
    }
    this.cracking = true
    log(`Cracking server ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.cracking = false
        this.protected = false
        log(`You have successfully cracked the server ${this.name}`)
        resolve(true)
      }, operationTimeout(this.version))
    })
  }

  clear() {
    this.display = []
    this.buffer = []
  }

  print(text) {
    if (Array.isArray(text)) {
      this.print(text.join(' '))
    } else {
      if (typeof text === 'string') {
        text.split('').forEach(c => this.buffer.push(c))
      }
      this.buffer.push('<br>')
    }
  }

  processBuffer() {
    if (this.buffer.length > 0) {
      const c = this.buffer[0]
      this.display.push(c)
      this.buffer.splice(0, 1)
    }
  }

  onAction(action) {
    super.onAction(action)
    if (action.key === 'connect') {
      this.print('Welcome to this nice amazing super cool server')
      this.print()
      this.print(['This', 'is', 'a', 'line'])
      this.print('Another line')
    }
  }
}
