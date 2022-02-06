import { log } from '@/utils'

export default {
  state: {
    opened: false,
    actions: [
      door => ({
        label: door.isOpened ? 'Close' : 'Open',
        key: 'toggleOpen',
        icon: door.isOpened ? 'fa-solid:door-closed' : 'fa-solid:door-open',
        disabled: false,
        click: () => door.toggle(),
      }),
    ],
  },

  get isOpened() { return this.state.opened },
  get isClosed() { return !this.state.opened },

  open() {
    if (this.isLocked) {
      return log('The door is locked', this)
    }
    if (this.isClosed) {
      this.state.opened = true
      return log('You open the door', this)
    }
    log('The door is already opened', this)
  },

  close() {
    if (this.isOpened) {
      this.state.opened = false
      return log('You close the door', this)
    }
    log('The door is already closed', this)
  },

  toggle() {
    if (this.isClosed) {
      this.open()
    } else {
      this.close()
    }
  },
}
