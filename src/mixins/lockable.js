import { log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    locked: false,
    keyId: undefined,
    actions: [
      door => (
        door.isLocked
          ? {
            label: 'Unlock',
            key: 'unlock',
            icon: 'fa-solid:lock-open',
            disabled: false,
            click: () => door.unlock(),
          }
          : undefined
      ),
    ],
  },

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

  get canUnlock() {
    return true
  },

  unlock() {
    if (!this.canUnlock) {
      return false
    }

    if (this.isLocked) {
      if (this.keyId && !store.player.has(this.keyId)) {
        log('This door needs a key')
        return false
      }
      this.state.locked = false
      log('Door has been unlocked')
      return true
    }
    log('The door is not locked')
    return true
  },
}
