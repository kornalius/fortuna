import Item from './item'
import File from './file'
import { mixin } from '@/utils'
import { store } from '@/store'
import Scannable from '@/mixins/scannable'
import Connectable from '@/mixins/connectable'
import Authenticable from '@/mixins/authenticable'
import Crackable from '@/mixins/crackable'

export default class Server extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Server',
      icon: 'whh:server',
      version: 1,
      pickable: false,
      usable: false,
      type: null,
      display: [],
      buffer: [],
      ...data,
    })
  }

  get isServer() { return true }

  get items() { return store.items.list.filter(i => i.location === this) }
  get files() { return this.items.filter(i => i.isFile || i.isSoftware) }

  get version() { return this.state.version }
  set version(value) { this.state.version = value }

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

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Item) {
      data.location = this
      store.items.update(data)
      return data
    } else {
      const i = new File(data)
      i.location = this
      store.items.update(i)
      return i
    }
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
}

mixin(Server, [Scannable, Connectable, Authenticable, Crackable])
