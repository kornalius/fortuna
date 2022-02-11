import { checkSoftware, emit, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    crackable: true,
    protected: true,
    actions: [
      item => (
        item.canCrack()
          ? {
            label: 'Crack password',
            key: 'crack',
            icon: 'cib:hackaday',
            disabled: false,
            click: async () => item.crack(),
          }
          : undefined
      ),
    ],
  },

  get isCrackable() { return this.state.crackable },
  set crackable(value) { this.state.crackable = value },

  get isProtected() { return this.state.protected },
  set protected(value) { this.state.protected = value },

  get isCracking() { return store.player.installedCracker?.isBusy || false },
  set cracking(value) { this.setBusy(store.player.installedCracker, value) },

  canCrack(showMessage) {
    if (!this.isCrackable) {
      if (showMessage) {
        log(`${this.name} is not crackable`)
      }
      return false
    }
    if (!this.isProtected) {
      if (showMessage) {
        log(`${this.name} is not protected`)
      }
      return false
    }
    if (!this.isConnected) {
      if (showMessage) {
        log(`You need to be connected to ${this.name.toLowerCase()} first`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedCracker, showMessage && 'cracker')
  },

  async crack() {
    if (!this.canCrack) {
      return false
    }
    this.cracking = true
    log(`Cracking ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.cracking = false
        this.protected = false
        log(`You have successfully cracked ${this.name.toLowerCase()}`)
        await emit.call(this, 'onCrack')
        resolve(true)
      }, operationTimeout(this.version))
    })
  },

  async onCrack() {},
}
