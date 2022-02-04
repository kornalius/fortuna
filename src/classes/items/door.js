import Item from './item'
import { log } from '../../utils';
import { store } from '../../store';

export default class Door extends Item {
  setupInstance(data) {
    let keyId

    if (data.key) {
      keyId = data.key.id
    }

    return {
      name: 'Door',
      opened: false,
      locked: false,
      directions: {},
      keyId,
      ...data,
      key: undefined,
    }
  }

  get isOpened() { return this.state.opened }
  get isClosed() { return !this.state.opened }

  get isLocked() { return this.state.locked }
  get isUnlocked() { return !this.state.locked }

  get directions() { return this.state.directions }

  get roomIds() { return Object.keys(this.directions) }
  get rooms() { return this.roomIds.map(id => store.rooms.get(id)) }

  get keyId() { return this.state.keyId }
  get key() {
    return this.state.keyId
      ? store.player.get(this.state.keyId)
      : undefined
  }
  set key(value) {
    if (value) {
      this.state.keyId = value.id
    } else {
      this.state.keyId = undefined
    }
  }

  open() {
    // try to unlock it first
    this.unlock()
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
  }

  close() {
    if (this.isOpened) {
      this.state.opened = false
      log('You close the door', this)
      return
    }
    log('The door is already closed', this)
  }

  toggle() {
    if (this.isClosed) {
      this.open()
    } else {
      this.close()
    }
  }

  unlock() {
    if (this.isLocked) {
      if (this.keyId && !store.player.has(this.keyId)) {
        log('This door needs a key', this)
        return
      }
      this.state.locked = false
      log('Door has been unlocked', this)
      return
    }
    log('The door is not locked', this)
  }
}
