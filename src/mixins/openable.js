import { log } from '@/utils'

export default {
  state: {
    opened: false,
    actions: [
      door => (
        door.canOpen()
          ? {
            label: door.isOpened ? 'Close' : 'Open',
            key: 'toggleOpen',
            icon: door.isOpened ? 'fa-solid:door-closed' : 'fa-solid:door-open',
            disabled: false,
            click: async () => door.toggle(),
          }
          : undefined
      ),
    ],
  },

  get isOpened() { return this.state.opened },
  get isClosed() { return !this.state.opened },

  canOpen(showMessage) {
    if (this.isOpened) {
      if (showMessage) {
        log(`${this.name} is already opened`)
      }
      return false
    }
    if (this.isLocked) {
      if (showMessage) {
        log('The door is locked')
      }
      return false
    }
    return true
  },

  canClose(showMessage) {
    if (this.isClosed) {
      if (showMessage) {
        log(`${this.name} is already closed`)
      }
      return false
    }
    return true
  },

  async open() {
    if (!this.canOpen(true)) {
      return false
    }
    this.state.opened = true
    log('You open the door')
    return true
  },

  async close() {
    if (!this.canClose(true)) {
      return false
    }
    this.state.opened = false
    log('You close the door')
    return true
  },

  async toggle() {
    if (this.isClosed) {
      return this.open()
    }
    return this.close()
  },
}
