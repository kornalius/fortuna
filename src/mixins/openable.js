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

  get canOpen() {
    return true
  },

  open() {
    if (!this.canOpen) {
      return false
    }
    if (this.isLocked) {
      log('The door is locked')
      return false
    }
    if (this.isClosed) {
      this.state.opened = true
      log('You open the door')
      return false
    }
    log('The door is already opened')
    return true
  },

  get canClose() {
    return this.isOpened
  },

  close() {
    if (!this.canClose) {
      return false
    }
    if (this.isOpened) {
      this.state.opened = false
      log('You close the door')
      return false
    }
    log('The door is already closed')
    return true
  },

  toggle() {
    if (this.isClosed) {
      return this.open()
    }
    return this.close()
  },
}
