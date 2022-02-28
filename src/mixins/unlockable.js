import { emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    unlockable: true,
    locked: false,
    keyId: null,
    actions: [
      item => (
        item.isUnlockable && item.isLocked
          ? {
            label: item.unlockLabel,
            key: 'unlock',
            icon: 'fa-solid:lock-open',
            disabled: !item.canUnlock(),
            click: async () => item.unlock(),
          }
          : undefined
      ),
    ],
    requirements: [
      { name: 'unlock', dex: 1 },
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
      this.state.keyId = null
    }
  },

  get unlockLabel() {
    return `Unlock ${this.requirementsLabelFor('unlock')}`
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
    if (store.player.isInCombat) {
      if (showMessage) {
        log('You cannot unlock this while in combat')
      }
      return false
    }
    if (store.player.isInDialog) {
      if (showMessage) {
        log('You cannot unlock this while in conversation')
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('unlock', showMessage));
  },

  async unlock() {
    if (!this.canUnlock(true)) {
      return false
    }
    store.game.playSound('unlock')
    this.state.locked = false
    log('Door has been unlocked')
    await emit.call(this, 'onUnlock')
    return true
  },

  async onUnlock() {},
}
