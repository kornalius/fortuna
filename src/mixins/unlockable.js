import { can, emit, log } from '@/utils'
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
  set locked(value) { this.state.locked = value },

  get keyId() { return this.state.keyId },
  set keyId(value) { this.state.keyId = value },

  get key() {
    return this.keyId
      ? store.items.get(this.keyId)
      : undefined
  },
  set key(value) {
    if (value) {
      this.keyId = value.id
    } else {
      this.keyId = null
    }
  },

  get unlockLabel() {
    return `Unlock ${this.requirementsLabelFor('unlock')}`
  },

  canUnlock(showMessage) {
    return can(this, [
      {
        expr: () => !this.isUnlockable,
        log: () => `${this.name} cannot be unlocked`
      },
      {
        expr: () => !this.isLocked,
        log: () => `${this.name} is not locked`
      },
      {
        expr: () => this.keyId && !store.player.has(this.keyId),
        log: () => `${this.name} needs a key to be unlocked`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => 'You cannot unlock this while in combat'
      },
      {
        expr: () => store.player.isInDialog,
        log: () => 'You cannot unlock this while in conversation'
      },
    ], showMessage, 'unlock')
  },

  async unlock() {
    if (!this.canUnlock(true)) {
      return false
    }
    this.locked = false
    log('Door has been unlocked')
    await emit.call(this, 'onUnlock')
    return true
  },

  async onUnlock() {
    store.game.playSound('unlock')
  },
}
