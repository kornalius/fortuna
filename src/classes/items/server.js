import shuffle from 'lodash/shuffle'
import compact from 'lodash/compact'
import Item from './item'
import File from './file'
import { mixin, randomFilename } from '@/utils'
import { store } from '@/store'
import Scannable from '@/mixins/softwares/scannable'
import Connectable from '@/mixins/softwares/connectable'
import Authenticable from '@/mixins/softwares/authenticable'
import Crackable from '@/mixins/softwares/crackable'
import Visitable from '@/mixins/visitable'
import random from 'lodash/random';

export default class Server extends Item {
  fileOrders = []

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

  onConnect() {
    if (this.firstVisit) {
      this.generateRandomDummyFiles(random(5, 25))
      const a = this.files
      // leave here, files needs to be computed first
      this.fileOrders = shuffle(this.fileOrders)
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

mixin(Server, [Scannable, Connectable, Authenticable, Crackable, Visitable])
