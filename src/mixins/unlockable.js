import { log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    unlockable: true,
    locked: false,
    keyId: undefined,
    actions: [
      door => (
        door.canUnlock()
          ? {
            label: 'Unlock',
            key: 'unlock',
            icon: 'fa-solid:lock-open',
            disabled: false,
            click: async () => door.unlock(),
          }
          : undefined
      ),
    ],
  },

  get isUnlockable() { return this.state.unlockable },
  set unlockable(value) { this.state.unlockable = value },

  get isLocked() { return this.state.locked },
  get isUnlocked() { return !this.state.locked },

  get keyId() { return this.state.keyId },
  get key() {
    return this.state.keyId
      ? store.player.get(this.state.keyId)
      : undefined
  },
  set key(value) {
    if (value) {
      this.state.keyId = value.id
    } else {
      this.state.keyId = undefined
    }
  },

  canUnlock(showMessage) {
    if (!this.isUnlockable) {
      if (showMessage) {
        log(`${this.name} cannot be unlocked`)
      }
      return false
    }
    if (!this.isLocked) {
      if (showMessage) {
        log(`${this.name} is not locked`)
      }
      return false
    }
    if (this.keyId && !store.player.has(this.keyId)) {
      if (showMessage) {
        log(`${this.name} needs a key to be unlocked`)
      }
      return false
    }
    return true
  },

  async unlock() {
    if (!this.canUnlock(true)) {
      return false
    }
    this.state.locked = false
    log('Door has been unlocked')
    return true
  },
}
