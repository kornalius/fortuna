import { can, checkSoftware, emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    decryptable: true,
    crypted: false,
    actions: [
      item => (
        item.isDecryptable && item.isCrypted
          ? {
              label: item.decryptLabel,
              key: 'decrypt',
              icon: 'carbon:encryption',
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
    log(`Decrypting file ${this.name.toLowerCase()}...`)
    return this.operate('decrypt', async () => {
      log(`You have successfully decrypted the file ${this.name.toLowerCase()}`)
      await emit.call(this, 'onDecrypt')
      this.crypted = false
    }, this.version)
  },

  async onDecrypt() {},
}
