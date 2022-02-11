import { emit, log } from '@/utils'

export default {
  state: {
    openable: true,
    closable: true,
    opened: false,
    actions: [
      door => (
        door.canOpen()
          ? {
            label: door.isOpened ? 'Close' : 'Open',
            key: 'toggleOpen',
            icon: door.isOpened ? 'fa-solid:door-closed' : 'fa-solid:door-open',
            disabled: false,
            click: async () => door.open(),
          }
          : undefined
      ),
    ],
  },

  get isOpenable() { return this.state.openable },
  set openable(value) { this.state.openable = value },

  get isOpened() { return this.state.opened },
  set opened(value) { this.state.opened = value },

  get isClosable() { return this.state.closeable },
  set closeable(value) { this.state.closeable = value },

  get isClosed() { return !this.state.opened },

  canOpen(showMessage) {
    if (!this.isOpenable) {
      if (showMessage) {
        log(`${this.name} cannot be opened`)
      }
      return false
    }
    if (this.isOpened) {
      if (showMessage) {
        log(`${this.name} is already opened`)
      }
      return false
    }
    if (this.isLocked) {
      if (showMessage) {
        log(`${this.name} is locked`)
      }
      return false
    }
    return true
  },

  async open() {
    if (!this.canOpen(true)) {
      return false
    }
    this.opened = true
    log(`You opened ${this.name.toLowerCase()}`)
    await emit.call(this, 'onOpen')
    return true
  },

  async onOpen() {},

  canClose(showMessage) {
    if (!this.isClosable) {
      if (showMessage) {
        log(`${this.name} cannot be closed`)
      }
      return false
    }
    if (this.isClosed) {
      if (showMessage) {
        log(`${this.name} is already closed`)
      }
      return false
    }
    return true
  },

  async close() {
    if (!this.canClose(true)) {
      return false
    }
    this.opened = false
    log(`You closed ${this.name.toLowerCase()}`)
    await emit.call(this, 'onClose')
    return true
  },

  async onClose() {},
}
