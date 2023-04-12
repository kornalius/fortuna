import shuffle from 'lodash/shuffle'
import compact from 'lodash/compact'
import random from 'lodash/random'
import {
  AnyData,
  can,
  checkSoftware,
  emit,
  log,
  LOG_WARN, mixin,
  pickRandom,
  randomFilename,
  registerClass
} from '@/utils'
import { IItemSetupData, Item } from '../items/item'
import { File } from './file'
import { femaleNames, maleNames, passwords } from '@/words'
import { SetupData } from '@/entity'
import { Software } from '@/classes/softwares/software'
import { IExaminable, Examinable, IExaminableSetupData } from '@/mixins/examinable'
import { IVersion, IVersionSetupData, Version } from '@/mixins/version'
import { IVisitable, IVisitableSetupData, Visitable } from '@/mixins/visitable'
import { ITimeout, ITimeoutSetupData, Timeout } from '@/mixins/timeout'
import { IOperationItem } from '@/mixins/operation'
import { IDropdownItem } from '@/mixins/actions'

export interface IServerSetupData extends
  IItemSetupData,
  IExaminableSetupData,
  IVersionSetupData,
  IVisitableSetupData,
  ITimeoutSetupData
{
  // current displayed lines
  display?: string[]
  // buffered characters
  buffer?: string[],
  // are we authenticating?
  authenticating?: boolean
  // is the server authenticated
  authenticated?: boolean
  // is the server crackable?
  crackable?: boolean
  // is the server protected? (Not cracked yet)
  protected?: boolean
  // are we listing files?
  listing?: boolean
  // position of the caret on screen
  caret?: number
  // username for crack
  username?: string | null
  // password for crack
  password?: string | null
}

export interface Server extends
  IExaminable,
  IVersion,
  IVisitable,
  ITimeout
{}

export class Server extends Item {
  fileOrders: string[] = []

  constructor(data?: IServerSetupData) {
    super(data)
  }

  setupInstance(data?: IServerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Server',
      icon: 'server',
      pickable: false,
      usable: false,
      display: [],
      buffer: [],
      authenticating: false,
      authenticated: false,
      crackable: true,
      protected: true,
      listing: false,
      caret: 0,
      username: null,
      password: null,
      actions: [
        (item: Server): IDropdownItem | undefined => (
          {
            label: 'Use',
            key: 'connect',
            icon: 'connect',
            disabled: !item.canConnect(),
            click: item.connect,
          }
        ),
        (item: Server): IDropdownItem | undefined => (
          {
            label: 'Authenticate',
            key: 'authenticate',
            icon: 'authenticate',
            disabled: !item.canAuthenticate(),
            click: item.authenticate,
          }
        ),
        (item: Server): IDropdownItem | undefined => (
          {
            label: 'List files',
            key: 'list',
            icon: 'listWhite',
            disabled: !item.canList(),
            click: item.list,
          }
        ),
      ],
      ...(data || {})
    })
  }

  get isServer(): boolean { return true }

  get items(): Item[] { return window.store.items.list.filter(i => i.location?.id === this.id) }

  get files(): File[] {
    const files = this.items.filter(i => (i as File).isFile || (i as Software).isSoftware) as File[]
    files.forEach(f => {
      if (!this.fileOrders.includes(f.id)) {
        this.fileOrders.push(f.id)
      }
    })
    return compact(this.fileOrders.map(id => files.find(f => f.id === id)))
  }

  get visibleFiles(): File[] { return this.files.filter(f => f.isVisible) }

  get isConnected(): boolean { return window.store.player.server?.id === this.id }
  get isDisconnected(): boolean { return window.store.player.server?.id !== this.id }

  get isAuthenticated(): boolean { return this.state.authenticated }
  set authenticated(value: boolean) { this.state.authenticated = value }

  get isAuthenticating(): boolean { return this.state.authenticating }
  set authenticating(value: boolean) { this.state.authenticating = value }

  get isCrackable(): boolean { return this.state.crackable }
  set crackable(value: boolean) { this.state.crackable = value }

  get isCracking(): boolean { return !!window.store.player.installedCracker?.isBusy }

  get isProtected(): boolean { return this.state.protected }
  set protected(value: boolean) { this.state.protected = value }

  get isListing(): boolean { return this.state.listing }
  set listing(value: boolean) { this.state.listing = value }

  get username(): string | null { return this.state.username }
  set username(value) { this.state.username = value }

  get password(): string | null { return this.state.password }
  set password(value) { this.state.password = value }

  get display(): string[] { return this.state.display }
  set display(value) { this.state.display = value }

  get buffer() { return this.state.buffer }
  set buffer(value) { this.state.buffer = value }

  get caret(): number { return this.state.caret }
  set caret(value) { this.state.caret = value }

  get isBusy(): boolean {
    return this.isAuthenticating
      || this.isCracking
      || this.isListing
  }

  get bootOS(): string[] {
    return [
      'Booting Volt OS v10.56...',
      'Kernel v3.1.1, Mon Apr 21 22:51:32 PDT',
      '',
      'Checking filesystem... OK',
      'Mounting devices... OK',
      '',
    ]
  }

  get bootSequence(): string[] {
    return [
      'Zintal CPU 58225 detected',
      'BIOS initialization... OK',
      'ROM v2.31... OK',
      'RAM initialized... OK',
      '',
    ]
  }

  get welcome(): string[] {
    return [
      `Welcome ${this.username}`,
      '',
    ]
  }

  addFile(data: (File | AnyData)[] | File | AnyData): File[] | File {
    if (Array.isArray(data)) {
      return data.map(d => this.addFile(d) as File)
    }

    if (data instanceof File) {
      data.location = this
      data.hovered = false
      window.store.items.update(data)
      return data
    } else {
      const f = new File(data)
      f.location = this
      f.hovered = false
      window.store.items.update(f)
      return f
    }
  }

  clear(): void {
    this.display = []
    this.buffer = []
    this.caret = 0
  }

  print(...args: (string | undefined | string[])[]): void {
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

  println(...args: (string | undefined | string[])[]): void {
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
  moveBy(count: number): void {
    this.caret += count
  }

  moveToEnd(): void {
    this.caret = this.display.length
  }

  /**
   * Erase <count> characters backward
   *
   * @param count
   */
  erase(count: number): void {
    this.caret -= 1
    const l = this.caret - count
    while (this.caret > l) {
      this.display.splice(this.caret, 1)
      this.caret -= 1
    }
    this.caret += 1
  }

  processBuffer(): void {
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
      window.store.game.playSound('print', 0.2)
    }
  }

  async waitBufferEmpty(): Promise<void> {
    return new Promise((resolve: () => void) => {
      const interval = setInterval(() => {
        if (this.buffer.length === 0) {
          clearInterval(interval)
          resolve()
        }
      }, 10)
    })
  }

  canConnect(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isBusy,
        log: () => `${this.nameProper} is busy performing another operation`
      },
      {
        expr: () => this.isConnected,
        log: () => `You are already connected to ${this.nameDisplay}`
      },
      {
        expr: () => window.store.player.isConnectedToServer,
        log: () => `You cannot use this while connected to ${window.store.player.server?.nameDisplay}`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => 'You cannot use this while in combat'
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => 'You cannot use this while in conversation'
      },
      {
        expr: () => this.isTimedout,
        log: () => `You are locked out of the server for another ${this.timeoutRemainingString}`
      },
    ], showMessage, 'connect')
  }

  async connect(): Promise<boolean> {
    if (!this.canConnect) {
      return false
    }
    return this.operate('connect', async () => {
      this.clear()
      window.store.player.server = this
      await this.visit()
      log(`You have successfully connected to ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onConnect')
      return true
    })
  }

  async onConnect(): Promise<void> {
    window.store.game.playSound('boot-sound')

    window.store.game.playSound('hum')

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
      // leave here, files needs to be computed first
      const a = this.files
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

    await this.authenticate()
  }

  canDisconnect(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isBusy,
        log: () => `${this.nameProper} is busy performing another operation`
      },
      {
        expr: () => !this.isConnected,
        log: () => `You are not connected to ${this.nameDisplay}`
      },
    ], showMessage, 'disconnect')
  }

  async disconnect(): Promise<boolean> {
    if (!this.canDisconnect) {
      return false
    }
    return this.operate('disconnect', async () => {
      window.store.player.server = null
      window.store.game.stopSound('hum')
      log(`You have successfully disconnected from ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onDisconnect')
      return true
    })
  }

  async onDisconnect(): Promise<void> {
    window.store.game.playSound('power-down')
  }

  canAuthenticate(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isBusy,
        log: () => `${this.nameProper} is busy performing another operation`
      },
      {
        expr: () => this.isAuthenticated,
        log: () => `You are already authenticated on ${this.nameDisplay}`
      },
      {
        expr: () => this.isProtected,
        log: () => `${this.nameProper} is protected, try cracking it first`
      },
      {
        expr: () => !this.isConnected,
        log: () => `You need to be connected to ${this.nameDisplay}`
      },
    ], showMessage, 'authenticate')
  }

  async authenticate(): Promise<boolean> {
    if (!this.canAuthenticate(true)) {
      return false
    }
    if (!this.isProtected) {
      log(`Authenticating on ${this.nameDisplay}...`, LOG_WARN, this.icon)
      this.authenticating = true
      return this.operate('authenticate', async () => {
        this.authenticated = true
        this.authenticating = false
        log(`You have successfully authenticated on ${this.nameDisplay}`, LOG_WARN, this.icon)
        await emit(this, 'onAuthenticate')
        return true
      }, this.version)
    }
    return false
  }

  async onAuthenticate(): Promise<void> {
    this.println('You have successfully authenticated')
    this.println(...this.welcome)
  }

  canCrack(showMessage?: boolean) {
    return can(this, [
      {
        expr: () => !!this.username,
        log: () => `${this.nameProper} does not have any user assign to it`
      },
      {
        expr: () => !!this.password,
        log: () => `${this.nameProper} does not have any password assign to a user`
      },
      {
        expr: () => this.isBusy,
        log: () => `${this.nameProper} is busy performing another operation`
      },
      {
        expr: () => !this.isConnected,
        log: () => `You need to be connected to ${this.nameDisplay} first`
      },
      {
        expr: () => !this.isCrackable,
        log: () => `${this.nameProper} is not crackable`
      },
      {
        expr: () => !this.isProtected,
        log: () => `${this.nameProper} is not protected`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedCracker, showMessage),
      },
    ], showMessage, 'crack')
  }

  async crack(): Promise<boolean> {
    if (!this.canCrack(true)) {
      return false
    }
    await this.waitBufferEmpty()
    this.authenticating = true
    this.state.crackedname = undefined
    this.state.crackedpwd = undefined
    window.store.game.playSound('keyboard')
    log(`Cracking ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('crack', async () => {
      window.store.game.stopSound('keyboard')
      this.protected = false
      this.authenticated = true
      this.authenticating = false
      log(`You have successfully cracked ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onCrack')
      log(`You have successfully authenticated on ${this.nameDisplay}`)
      await emit(this, 'onAuthenticate')
      return true
    }, this.version * 3)
  }

  async onCrack(): Promise<void> {}

  canList(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => this.isBusy,
        log: () => `${this.nameProper} is busy performing another operation`
      },
      {
        expr: () => !this.isConnected,
        log: () => `You need to be connected to ${this.nameDisplay} to perform a listing`
      },
      {
        expr: () => !this.isAuthenticated,
        log: () => `You need to be authenticated to ${this.nameDisplay} first`
      },
    ], showMessage, 'list')
  }

  async list(): Promise<boolean> {
    if (!this.canList(true)) {
      return false
    }
    window.store.game.playSound('hd')
    this.listing = true
    return this.operate('list', async () => {
      window.store.game.stopSound('hd')
      this.files.forEach(file => { file.hidden = false })
      this.listing = false
      await emit(this, 'onList')
      return true
    }, 3)
  }

  async onList(): Promise<void> {}

  fillLetters(count: number, arr: string[], word: string): void {
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

  async onOperation(operation: IOperationItem): Promise<void> {
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
      if (this.username && this.password) {
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
          const len = this.password?.length || 0
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
  }

  generateRandomDummyFiles(count: number): void {
    for(let i = 0; i < count; i++) {
      const name = randomFilename()
      const type = name.substring(name.indexOf('.') + 1)
      this.addFile(new File({
        name,
        size: random(1, window.store.config.maxFileSize),
        type,
        downloadable: false,
        deletable: false,
      }))
    }
  }
}

mixin(Server, [
  Examinable,
  Version,
  Visitable,
  Timeout
])

registerClass(Server)
