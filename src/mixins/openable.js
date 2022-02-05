import { log } from '@/utils';

export default {
  state: {
    opened: false,
  },

  get isOpened() { return this.state.opened },
  get isClosed() { return !this.state.opened },

  open() {
    if (this.unlock) {
      // try to unlock it first
      this.unlock()
    }
    if (this.isLocked) {
      log('The door is locked', this)
      return
    }
    if (this.isClosed) {
      this.state.opened = true
      log('You open the door', this)
      return
    }
    log('The door is already opened', this)
  },

  close() {
    if (this.isOpened) {
      this.state.opened = false
      log('You close the door', this)
      return
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
