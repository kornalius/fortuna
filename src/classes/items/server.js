import first from 'lodash/first'
import last from 'lodash/last'
import Item from './item'
import { store } from '@/store'
import { log, operationTimeout } from '@/utils'

export default class Server extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Server',
      icon: 'whh:server',
      version: 1,
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
          !item.isScanned
            ? {
              label: 'Scan',
              key: 'scan',
              icon: 'mdi:cube-scan',
              disabled: false,
              click: () => item.scan(),
            }
            : undefined
        ),
        item => (
          item.isScanned && store.player.server !== item
            ? {
              label: 'Connect',
              key: 'connect',
              icon: 'mdi:lan-connect',
              disabled: false,
              click: () => item.connect(),
            }
            : undefined
        ),
        item => (
          store.player.server === item
            ? {
              label: 'Disconnect',
              key: 'disconnect',
              icon: 'mdi:lan-disconnect',
              disabled: false,
              click: () => item.disconnect(),
            }
            : undefined
        ),
        item => (
          item.isScanned && !item.isProtected && store.player.server === item
            ? {
              label: 'Authenticate',
              key: 'authenticate',
              icon: 'ph:password-bold',
              disabled: false,
              click: () => item.authenticate(),
            }
            : undefined
        ),
        item => (
          item.isProtected && !item.authenticated && store.player.server === item
            ? {
              label: 'Crack password',
              key: 'crack',
              icon: 'cib:hackaday',
              disabled: false,
              click: () => item.crack(),
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

  get isAuthenticated() { return this.state.authenticated }
  set authenticated(value) { this.state.authenticated = value }

  get isProtected() { return this.state.protected }
  set protected(value) { this.state.protected = value }

  get isScanning() { return this.installedScanner?.isBusy }
  set scanning(value) { this.setBusy(store.player.installedScanner, value) }

  get isConnecting() { return this.installedConnector?.isBusy }
  set connecting(value) { this.setBusy(store.player.installedConnector, value) }

  get isDisconnecting() { return this.installedConnector?.isBusy }
  set disconnecting(value) { this.setBusy(store.player.installedConnector, value) }

  get isAuthenticating() { return this.installedAuthenticator?.isBusy }
  set authenticating(value) { this.setBusy(store.player.installedAuthenticator, value) }

  get isCracking() { return this.installedCracker?.isBusy }
  set cracking(value) { this.setBusy(store.player.installedCracker, value) }

  get isBusy() { return this.isScanning || this.isConnecting || this.isAuthenticating || this.isCracking }

  get display() { return this.state.display }
  set display(value) { this.state.display = value }

  get buffer() { return this.state.buffer }
  set buffer(value) { this.state.buffer = value }

  get canScan() {
    if (this.isBusy) {
      log(`Server ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (this.isScanned) {
      log(`Server ${this.name} has already been scanned`)
      return false
    }
    return true
  }

  get canConnect() {
    if (this.isBusy) {
      log(`Server ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (!this.isScanned) {
      log(`Server ${this.name} needs to be scanned for opened ports first`)
      return false
    }
    if (store.player.server === this) {
      log(`You are already connected to the server ${this.name}`)
      return false
    }
    return true
  }

  get canAuthenticate() {
    if (this.isBusy) {
      log(`Server ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (this.isAuthenticated) {
      log(`You are already authenticated on server ${this.name}`)
      return false
    }
    if (this.isProtected) {
      log(`The server ${this.name} is protected`)
      return false
    }
    if (store.player.server !== this) {
      log(`You need to be connected to the server ${this.name}`)
      return false
    }
    return true
  }

  get canDisconnect() {
    if (this.isBusy) {
      log(`Server ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (store.player.server !== this) {
      log(`You are not connected to the server ${this.name}`)
      return false
    }
    return true
  }

  get canCrack() {
    if (this.isBusy) {
      log(`Server ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (store.player.server !== this) {
      log(`You need to be connected to the server ${this.name} first`)
      return false
    }
    return true
  }

  setBusy(software, value) {
    if (software) {
      software.busy = value
    }
  }

  scan() {
    if (!this.canScan) {
      log(`You cannot scan the server ${this.name}`)
      return false
    }
    this.scanning = true
    log(`Scanning server ${this.name}...`)
    setTimeout(() => {
      this.scanning = false
      this.scanned = true
      log(`You have successfully scanned the server ${this.name}`)
    }, operationTimeout(this.version))
    return true
  }

  connect() {
    if (!this.canConnect) {
      log(`You cannot connect to the server ${this.name}`)
      return false
    }
    this.connecting = true
    log(`Connecting to the server ${this.name}...`)
    setTimeout(() => {
      this.connecting = false
      store.player.server = this
      log(`You have successfully connected to the server ${this.name}`)
    }, operationTimeout(this.version))
    return true
  }

  disconnect() {
    if (!this.canDisconnect) {
      log(`You cannot disconnect from the server ${this.name}`)
      return false
    }
    this.disconnecting = true
    log(`Disconnecting from the server ${this.name}...`)
    setTimeout(() => {
      this.disconnecting = false
      log(`You have successfully disconnected from the server ${this.name}`)
    }, operationTimeout(this.version))
    return true
  }

  authenticate() {
    if (!this.canAuthenticate) {
      log(`You cannot authenticate on the server ${this.name}`)
      return false
    }
    this.authenticating = true
    log(`Authenticating on server ${this.name}...`)
    setTimeout(() => {
      this.authenticating = false
      this.authenticated = true
      log(`You have successfully authenticated the server ${this.name}`)
    }, operationTimeout(this.version))
    return true
  }

  crack() {
    if (!this.canCrack) {
      log(`You cannot crack the server ${this.name}`)
      return false
    }
    this.cracking = true
    log(`Cracking server ${this.name}...`)
    setTimeout(() => {
      this.cracking = false
      this.protected = false
      log(`You have successfully cracked the server ${this.name}`)
    }, operationTimeout(this.version))
    return true
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

  onConnect() {
    this.print('Welcome to this nice amazing super cool server')
    this.print()
    this.print(['This', 'is', 'a', 'line'])
    this.print('Another line')
  }

  onDisconnect() {
  }
}
