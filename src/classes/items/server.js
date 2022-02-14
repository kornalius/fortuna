import shuffle from 'lodash/shuffle'
import compact from 'lodash/compact'
import random from 'lodash/random'
import { checkSoftware, emit, log, mixin, pickRandom, randomFilename } from '@/utils'
import Item from './item'
import File from './file'
import { store } from '@/store'
import Version from '@/mixins/version'
import Visitable from '@/mixins/visitable'
import { femaleNames, maleNames, passwords } from '@/words';

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
      caret: 0,
      username: null,
      password: null,
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
        item => (
          item.canCrack()
            ? {
              label: 'Crack authentication',
              key: 'crack',
              icon: 'mdi:cube-scan',
              disabled: false,
              click: async () => item.crack(),
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

  get username() { return this.state.username }
  set username(value) { this.state.username = value }

  get password() { return this.state.password }
  set password(value) { this.state.password = value }

  get display() { return this.state.display }
  set display(value) { this.state.display = value }

  get buffer() { return this.state.buffer }
  set buffer(value) { this.state.buffer = value }

  get caret() { return this.state.caret }
  set caret(value) { this.state.caret = value }

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

  get welcome() {
    return [
      `Welcome ${this.username}`,
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
    this.caret = 0
  }

  print(...args) {
    args.forEach(text => {
      if (Array.isArray(text)) {
        this.print(text.join(' '))
      } else {
        if (typeof text === 'string') {
          text.split('').forEach(c => this.buffer.push(c))
        }
      }
    })
  }

  println(...args) {
    args.forEach(text => {
      if (Array.isArray(text)) {
        this.println(text.join(' '))
      } else {
        if (typeof text === 'string') {
          text.split('').forEach(c => this.buffer.push(c))
        }
        this.buffer.push('<br>')
      }
    })
  }

  /**
   * Move caret by <count> characters
   *
   * @param count
   */
  moveBy(count) {
    this.caret += count
  }

  moveToEnd() {
    this.caret = this.display.length
  }

  /**
   * Erase <count> characters backward
   *
   * @param count
   */
  erase(count) {
    this.caret -= 1
    const l = this.caret - count
    while (this.caret > l) {
      this.display.splice(this.caret, 1)
      this.caret -= 1
    }
    this.caret += 1
  }

  processBuffer() {
    if (this.buffer.length > 0) {
      const c = this.buffer[0]
      if (this.caret < this.display.length) {
        if (this.display[this.caret] === '<br>') {
          this.display.splice(this.caret, 0, c)
        } else {
          this.display[this.caret] = c
        }
      } else {
        this.display.push(c)
      }
      this.buffer.splice(0, 1)
      this.caret += 1
      store.game.playSound('print', 0.2)
    }
  }

  async waitBufferEmpty() {
    return new Promise(resolve => {
      let interval
      interval = setInterval(() => {
        if (this.buffer.length === 0) {
          clearInterval(interval)
          resolve()
        }
      }, 10)
    })
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
    store.game.playSound('machine-sound')

    if (!this.username) {
      this.username = pickRandom(pickRandom([femaleNames, maleNames]))
    }

    if (!this.password) {
      this.password = pickRandom(passwords)
    }

    if (this.firstVisit) {
      if (localStorage.getItem('DEV_MODE') !== 'true') {
        this.println(...this.bootSequence)
      }
      this.generateRandomDummyFiles(random(5, 25))
      const a = this.files
      // leave here, files needs to be computed first
      this.fileOrders = shuffle(this.fileOrders)
    }

    if (localStorage.getItem('DEV_MODE') !== 'true') {
      this.println(...this.bootOS)
    }

    this.println('Enter login information below...')
    this.println('Username:')
    this.println('Password:')

    await this.waitBufferEmpty()

    this.moveBy(-11)

    return this.authenticate()
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
      store.game.stopSound('machine-sound')
      store.game.playSound('power-down')
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
    if (!this.isProtected) {
      log(`Authenticating on ${this.name.toLowerCase()}...`)
      this.authenticating = true
      return this.operate('authenticate', async () => {
        this.authenticated = true
        this.authenticating = false
        log(`You have successfully authenticated on ${this.name.toLowerCase()}`)
        await emit.call(this, 'onAuthenticate')
      }, this.version)
    }
  }

  async onAuthenticate() {
    this.println('You have successfully authenticated')
    this.println(...this.welcome)
  }

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
    await this.waitBufferEmpty()
    this.cracking = true
    this.authenticating = true
    this.state.crackedname = undefined
    this.state.crackedpwd = undefined
    store.game.playSound('keyboard')
    log(`Cracking ${this.name.toLowerCase()}...`)
    return this.operate('crack', async () => {
      store.game.stopSound('keyboard')
      this.protected = false
      this.authenticated = true
      this.authenticating = false
      log(`You have successfully cracked ${this.name.toLowerCase()}`)
      await emit.call(this, 'onCrack')
      log(`You have successfully authenticated on ${this.name.toLowerCase()}`)
      await emit.call(this, 'onAuthenticate')
    }, this.version * 3)
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
    if (!this.isAuthenticated) {
      if (showMessage) {
        log(`You need to be authenticated to ${this.name.toLowerCase()} first`)
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
    store.game.playSound('hd')
    return this.operate('list', async () => {
      store.game.stopSound('hd')
      this.files.forEach(file => { file.hidden = false })
      this.listing = false
      await emit.call(this, 'onList')
    }, 3)
  }

  async onList() {}

  fillLetters(count, arr, word) {
    const len = arr.length
    for (let i = 0; i < count; i++) {
      let found = false
      let c = 0
      while (!found && c < len * 5) {
        const x = random(len - 1)
        if (arr[x] !== word[x]) {
          arr[x] = word[x]
          found = true
        }
        c += 1
      }
    }
  }

  async onOperation(operation) {
    if (operation.name === 'list') {
      let x = 0
      const count = Math.floor(this.files.length / 10)
      this.files.forEach(file => {
        if (x < count && !file.isVisible) {
          file.hidden = false
          x += 1
        }
      })
    } else if (operation.name === 'authenticate') {
      if (operation.pos === 10) {
        this.print(this.state.username)
        this.moveBy(10)
      } else if (operation.pos === 100) {
        this.println(this.state.password)
      }
    } else if (operation.name === 'crack') {
      if (operation.pos <= 50) {
        const len = this.username.length
        const count = Math.ceil(operation.pos / 50 * len)
        if (this.state.crackedname) {
          await this.waitBufferEmpty()
          this.erase(len)
        } else {
          this.state.crackedname = new Array(len)
          this.state.crackedname.fill('*')
        }
        this.fillLetters(count, this.state.crackedname, this.username)
        this.print(this.state.crackedname.join(''))
      } else {
        const len = this.password.length
        const count = Math.ceil(operation.pos / 50 * len)
        if (this.state.crackedpwd) {
          await this.waitBufferEmpty()
          this.erase(len)
        } else {
          this.moveBy(10)
          this.state.crackedpwd = new Array(len)
          this.state.crackedpwd.fill(' ')
        }
        this.fillLetters(count, this.state.crackedpwd, this.password)
        this.print(this.state.crackedpwd.join(''))
        if (operation.pos === 100) {
          await this.waitBufferEmpty()
          this.moveToEnd()
          this.println('')
        }
      }
    }
  }

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
