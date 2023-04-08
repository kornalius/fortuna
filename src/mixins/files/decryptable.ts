import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { Name } from '@/mixins/name'
import { Icon } from '@/mixins/icon'
import { Version } from '@/mixins/version'
import { Operation } from '@/mixins/operation'
import { IRequirements } from '@/mixins/requirements'

/**
 * Makes an object decryptable (for Files)
 */

export interface Decryptable extends Name, Icon, Version, Operation, IRequirements {}

export class Decryptable {
  state: State = {
    // is the object decryptable
    decryptable: true,
    // is the object crypted
    crypted: false,
    actions: [
      (item: Decryptable) => (
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
  }

  get isDecryptable(): boolean { return this.state.decryptable }
  set decryptable(value: boolean) { this.state.decryptable = value }

  get isCrypted(): boolean { return this.state.crypted }
  set crypted(value: boolean) { this.state.crypted = value }

  get decryptLabel(): string {
    return `Decrypt ${this.requirementsLabelFor('decrypt')}`
  }

  canDecrypt(showMessage?: boolean) {
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
        expr: () => !window.store.player.has(this),
        log: () => `${this.name} must be on your disk first`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedDecrypter,showMessage),
      },
    ], showMessage, 'decrypt')
  }

  async decrypt() {
    if (!this.canDecrypt(true)) {
      return false
    }
    log(`Decrypting file ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('decrypt', async () => {
      log(`You have successfully decrypted the file ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit(this, 'onDecrypt')
      this.crypted = false
    }, this.version)
  }

  async onDecrypt() {}
}
