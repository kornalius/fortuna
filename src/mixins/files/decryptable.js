import { checkSoftware, emit, log } from '@/utils'
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
    if (!this.isDecryptable) {
      if (showMessage) {
        log(`${this.name} cannot be decrypted`)
      }
      return false
    }
    if (!this.isCrypted) {
      if (showMessage) {
        log(`${this.name} is not crypted`)
      }
      return false
    }
    if (!store.player.has(this)) {
      if (showMessage) {
        log(`${this.name} must be on your disk first`)
      }
      return false
    }
    if (this.checkRequirementsFor && !this.checkRequirementsFor('decrypt', showMessage)) {
      return false
    }
    return checkSoftware.call(this, store.player.installedDecrypter,showMessage)
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
