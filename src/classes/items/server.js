import shuffle from 'lodash/shuffle'
import compact from 'lodash/compact'
import random from 'lodash/random'
import { checkSoftware, emit, log, mixin, randomFilename } from '@/utils'
import Item from './item'
import File from './file'
import { store } from '@/store'
import Version from '@/mixins/version'
import Visitable from '@/mixins/visitable'

export default class Server extends Item {
  fileOrders = []

  setupInstance(data) {
    return super.setupInstance({
      name: 'Server',
      icon: 'whh:server',
      pickable: false,
      usable: false,
      type: null,
      display: [],
      buffer: [],
      authenticating: false,
      authenticated: false,
      crackable: true,
      cracking: true,
      protected: true,
      listing: false,
      actions: [
        item => (
          item.canConnect()
            ? {
              label: 'Use',
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
          item.canList()
            ? {
              label: 'List files',
              key: 'list',
              icon: 'mdi:cube-scan',
              disabled: false,
              click: async () => item.list(),
            }
            : undefined
        ),
      ],
      ...data,
    })
  }

  get isServer() { return true }

  get items() { return store.items.list.filter(i => i.location === this) }

  // get files() { return this.items.filter(i => i.isFile || i.isSoftware) }

  get files() {
    const files = this.items.filter(i => i.isFile || i.isSoftware)
    files.forEach(f => {
      if (!this.fileOrders.includes(f.id)) {
        this.fileOrders.push(f.id)
      }
    })
    return compact(this.fileOrders.map(id => files.find(f => f.id === id)))
  }

  get visibleFiles() { return this.files.filter(f => f.isVisible) }

  get isConnected() { return store.player.server === this }
  get isDisconnected() { return store.player.server !== this }

  get isAuthenticated() { return this.state.authenticated }
  set authenticated(value) { this.state.authenticated = value }

  get isAuthenticating() { return this.state.authenticating }
  set authenticating(value) { this.state.authenticating = value }

  get isCrackable() { return this.state.crackable }
  set crackable(value) { this.state.crackable = value }

  get isCracking() { return !!store.player.installedCracker?.isBusy }

  get isProtected() { return this.state.protected }
  set protected(value) { this.state.protected = value }

  get isListing() { return this.state.listing }
  set listing(value) { this.state.listing = value }

  get display() { return this.state.display }
  set display(value) { this.state.display = value }

  get buffer() { return this.state.buffer }
  set buffer(value) { this.state.buffer = value }

  get isBusy() {
    return this.isAuthenticating
      || this.isCracking
      || this.isListing
  }

  get bootOS() {
    return [
      'Booting Volt OS v10.56...',
      'Kernel v3.1.1, Mon Apr 21 22:51:32 PDT',
      '',
      'Checking filesystem... OK',
      'Mounting devices... OK',
      '',
    ]
  }

  get bootSequence() {
    return [
      'Zintal CPU 58225 detected',
      'BIOS initialization... OK',
      'ROM v2.31... OK',
      'RAM initialized... OK',
      '',
    ]
  }

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof File) {
      data.location = this
      data.hovered = false
      store.items.update(data)
      return data
    } else {
      const i = new File(data)
      i.location = this
      i.hovered = false
      store.items.update(i)
      return i
    }
  }

  clear() {
    this.display = []
    this.buffer = []
  }

  print(...args) {
    args.forEach(text => {
      if (Array.isArray(text)) {
        this.print(text.join(' '))
      } else {
        if (typeof text === 'string') {
          text.split('').forEach(c => this.buffer.push(c))
        }
        this.buffer.push('<br>')
      }
    })
  }

  processBuffer() {
    if (this.buffer.length > 0) {
      const c = this.buffer[0]
      this.display.push(c)
      this.buffer.splice(0, 1)
      store.game.playSound('print', 0.2)
    }
  }

  canConnect(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is busy performing another operation`)
      }
      return false
    }
    if (this.isConnected) {
      if (showMessage) {
        log(`You are already connected to ${this.name.toLowerCase()}`)
      }
      return false
    }
    return true
  }

  async connect() {
    if (!this.canConnect) {
      return false
    }
    return this.operate('connect', async () => {
      this.clear()
      store.player.server = this
      this.visited += 1
      store.game.playSound('boot-sound')
      log(`You have successfully connected to ${this.name.toLowerCase()}`)
      await emit.call(this, 'onConnect')
    })
  }

  async onConnect() {
    if (this.firstVisit) {
      this.print(...this.bootSequence)
      this.generateRandomDummyFiles(random(5, 25))
      const a = this.files
      // leave here, files needs to be computed first
      this.fileOrders = shuffle(this.fileOrders)
    }
    this.print(...this.bootOS)
    this.list()
  }

  canDisconnect(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is busy performing another operation`)
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
  }

  async disconnect() {
    if (!this.canDisconnect) {
      return false
    }
    return this.operate('disconnect', async () => {
      store.player.server = null
      log(`You have successfully disconnected from ${this.name}`)
      await emit.call(this, 'onDisconnect')
    })
  }

  async onDisconnect() {}

  canAuthenticate(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is busy performing another operation`)
      }
      return false
    }
    if (this.isAuthenticated) {
      if (showMessage) {
        log(`You are already authenticated on ${this.name.toLowerCase()}`)
      }
      return false
    }
    if (this.isProtected) {
      if (showMessage) {
        log(`${this.name} is protected, try cracking it first`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to ${this.name.toLowerCase()}`)
      }
      return false
    }
    return true
  }

  async authenticate() {
    if (!this.canAuthenticate) {
      return false
    }
    log(`Authenticating on ${this.name.toLowerCase()}...`)
    this.authenticating = true
    return this.operate('autenticate', async () => {
      this.authenticated = true
      this.authenticating = false
      log(`You have successfully authenticated on ${this.name.toLowerCase()}`)
      await emit.call(this, 'onAuthenticate')
    }, this.version)
  }

  async onAuthenticate() {}

  canCrack(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is busy performing another operation`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to ${this.name.toLowerCase()} first`)
      }
      return false
    }
    if (!this.isCrackable) {
      if (showMessage) {
        log(`${this.name} is not crackable`)
      }
      return false
    }
    if (!this.isProtected) {
      if (showMessage) {
        log(`${this.name} is not protected`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedCracker,showMessage)

  }

  async crack() {
    if (!this.canCrack(true)) {
      return false
    }
    log(`Cracking ${this.name.toLowerCase()}...`)
    return this.operate('crack', async () => {
      this.protected = false
      log(`You have successfully cracked ${this.name.toLowerCase()}`)
      await emit.call(this, 'onCrack')
    }, this.version)
  }

  async onCrack() {}

  canList(showMessage) {
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is busy performing another operation`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to ${this.name.toLowerCase()} to perform a listing`)
      }
      return false
    }
    return true
  }

  async list() {
    if (!this.canList(true)) {
      return false
    }
    this.listing = true
    return this.operate('list', async () => {
      this.files.forEach(file => { file.hidden = false })
      this.listing = false
      await emit.call(this, 'onList')
    }, 3)
  }

  onOperation(operation) {
    if (operation.name === 'list') {
      let x = 0
      const count = Math.floor(this.files.length / 10)
      this.files.forEach(file => {
        if (x < count && !file.isVisible) {
          file.hidden = false
          x += 1
        }
      })
    }
  }

  async onList() {}

  generateRandomDummyFiles(count) {
    for(let i = 0; i < count; i++) {
      const name = randomFilename()
      const type = name.substring(name.indexOf('.') + 1)
      this.addItem(new File({
        name,
        size: random(1, store.config.maxFileSize),
        type,
        viewable: false,
        downloadable: false,
        deletable: false,
      }))
    }
  }
}

mixin(Server, [
  Version,
  Visitable,
])
