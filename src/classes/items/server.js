import first from 'lodash/first'
import last from 'lodash/last'
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
      type: undefined,
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

  get isScanning() { return this.installedScanner?.isBusy }
  set scanning(value) { this.setBusy(store.player.installedScanner, value) }

  get isAuthenticated() { return this.state.authenticated }
  set authenticated(value) { this.state.authenticated = value }

  get isAuthenticating() { return this.installedAuthenticator?.isBusy }
  set authenticating(value) { this.setBusy(store.player.installedAuthenticator, value) }

  get isProtected() { return this.state.protected }
  set protected(value) { this.state.protected = value }

  get isCracking() { return this.installedCracker?.isBusy }
  set cracking(value) { this.setBusy(store.player.installedCracker, value) }

  get isConnecting() { return this.installedConnector?.isBusy }
  set connecting(value) { this.setBusy(store.player.installedConnector, value) }

  get isConnected() { return store.player.server === this }
  get isDisconnected() { return store.player.server !== this }

  get isDisconnecting() { return this.disconnecting }
  set disconnecting(value) { this.state.disconnecting = value }

  get isBusy() {
    return !!(this.isScanning
      || this.isConnecting
      || this.isDisconnecting
      || this.isAuthenticating
      || this.isCracking)
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
    return checkSoftware.call(this, store.player.installedScanner, showMessage && 'scanner')
  }

  canConnect(showMessage) {
    if (!this.isScanned) {
      if (showMessage) {
        log(`Server ${this.name} needs to be scanned for opened ports first`)
      }
      return false
    }
    if (store.player.server === this) {
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
    if (store.player.server !== this) {
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
    if (store.player.server !== this) {
      if (showMessage) {
        log(`You are not connected to the server ${this.name}`)
      }
      return false
    }
    return true
  }

  canCrack(showMessage) {
    if (store.player.server !== this) {
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
        store.player.server = undefined
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
      this.buffer.push(text)
    }
  }

  processBuffer() {
    if (this.buffer?.length > 0) {
      // get the first line in buffer
      const f = first(this.buffer)

      // carriage return
      if (f === undefined) {
        // add a new display line
        this.display.push('<br>')

        // remove first buffer line
        this.buffer.splice(0, 1)
      }

      // characters remaining
      else if (f.length) {
        const c = f[0]

        // if no display lines
        if (this.display.length === 0) {
          this.display.push('')
        }

        // get last line on display
        let l = last(this.display)

        // append character to last line
        this.display[this.display.length - 1] = `${l}${c}`

        // remove first character
        this.buffer[0] = f.substring(1)
      } else {
        // add a new display line
        this.display.push('')

        // remove first buffer line
        this.buffer.splice(0, 1)
      }
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
