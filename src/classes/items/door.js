import Item from './item'
import { log } from '../../utils';
import { store } from '../../store';

export default class Door extends Item {
  setupInstance(data) {
    return {
      name: 'Door',
      opened: false,
      locked: false,
      lockable: true,
      blocked: false,
      directions: {},
      ...data,
    }
  }

  get isOpened() { return this.state.opened }
  get isClosed() { return !this.state.opened }

  get isLocked() { return this.state.locked }
  get isUnlocked() { return !this.state.locked }

  get isLockable() { return this.state.lockable }
  set isLockable(value) { this.state.lockable = value }

  get isBlocked() { return this.state.blocked }
  set isBlocked(value) { this.state.blocked = value }

  get directions() { return this.state.directions }

  get roomIds() { return Object.keys(this.directions) }
  get rooms() { return this.roomIds.map(id => store.rooms.get(id)) }

  open() {
    if (this.isClosed && !this.isBlocked) {
      this.state.opened = true
      log('Door has been opened')
    }
  }

  close() {
    if (this.isOpened) {
      this.state.opened = false
      log('Door has been closed')
    }
  }

  toggle() {
    if (this.isClosed) {
      this.open()
    } else {
      this.close()
    }
  }

  lock() {
    if (this.isUnlocked && this.isLockable) {
      this.state.locked = true
    }
  }

  unlock() {
    if (this.isLocked) {
      this.state.locked = false
    }
  }

  block() {
    if (!this.isBlocked) {
      this.state.blocked = true
    }
  }

  unblock() {
    if (this.isBlocked) {
      this.state.blocked = false
    }
  }
}
