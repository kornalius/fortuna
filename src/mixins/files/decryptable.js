import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object decryptable (for Files)
 */

export default {
  state: {
    // is the object decryptable
    decryptable: true,
    // is the object crypted
    crypted: false,
    actions: [
      item => (
        item.isDecryptable && item.isCrypted
          ? {
              label: item.decryptLabel,
              key: 'decrypt',
              icon: 'decrypt',
              disabled: !item.canDecrypt(),
              click: async () => item.decrypt(),
            }
          : undefined
      ),
    ],
  },

  get isDecryptable() { return this.state.decryptable },
  set decryptable(value) { this.state.decryptable = value },

  get isCrypted() { return store.player.crypted },
  set crypted(value) { this.state.crypted = value },

  get decryptLabel() {
    return `Decrypt ${this.requirementsLabelFor('decrypt')}`
  },

  canDecrypt(showMessage) {
    return can(this, [
      {
        expr: () => !this.isDecryptable,
        log: () => `${this.name} cannot be decrypted`
      },
      {
        expr: () => !this.isCrypted,
        log: () => `${this.name} is not crypted`
      },
      {
        expr: () => !store.player.has(this),
        log: () => `${this.name} must be on your disk first`
      },
      {
        expr: () => !checkSoftware.call(this, store.player.installedDecrypter,showMessage),
      },
    ], showMessage, 'decrypt')
  },

  async decrypt() {
    if (!this.canDecrypt(true)) {
      return false
    }
    log(`Decrypting file ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('decrypt', async () => {
      log(`You have successfully decrypted the file ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit.call(this, 'onDecrypt')
      this.crypted = false
    }, this.version)
  },

  async onDecrypt() {},
}
