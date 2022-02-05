import { store } from '@/store'
import { log } from '@/utils'

export default {
  state: {
    locked: false,
    keyId: undefined,
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
  },
}
