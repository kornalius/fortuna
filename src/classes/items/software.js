import File from './file'
import { store } from '@/store'
import { log, mixin, operationTimeout } from '@/utils'
import Equippable from '@/mixins/equipable'

export default class Software extends File {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Software',
      icon: 'whh:software',
      equippable: true,
      decryptable: false,
      viewable: false,
      viewerType: null,
      actions: [],
      actionsOrder: [],
      ...data,
    })
  }

  get isSoftware() { return true }

  get isFile() { return false }

  get content() { return undefined }
  set content(value) {}

  get isTextFile() { return false }
  get isImageFile() { return false }

  get isViewed() { return false }
  set viewed(value) {}

  get viewerType() { return this.state.viewerType }
  set viewerType(value) { this.state.viewerType = value }

  get isViewer() { return this.equipType === 'viewer' }
  get isDecrypter() { return this.equipType === 'decrypter' }
  get isDownloader() { return this.equipType === 'downloader' }
  get isUploader() { return this.equipType === 'uploader' }
  get isDeleter() { return this.equipType === 'deleter' }
  get isCracker() { return this.equipType === 'cracker' }
  get isScanner() { return this.equipType === 'scanner' }
  get isConnector() { return this.equipType === 'connector' }
  get isAuthenticator() { return this.equipType === 'authenticator' }

  async install() {
    if (!this.canEquip(true)) {
      log(`You cannot install ${this.name}`)
      return false
    }
    this.busy = true
    log(`Installing ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.busy = false
        this.equip(store.player)
        log(`You have successfully installed ${this.name}`)
        resolve(true)
      }, operationTimeout(this.weight))
    })
  }

  async uninstall() {
    if (!this.canUnequip(true)) {
      log(`You cannot uninstall ${this.name}`)
      return false
    }
    this.busy = true
    log(`Uninstalling ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.busy = false
        this.unequip(store.player)
        log(`You have successfully uninstalled ${this.name}`)
        resolve(true)
      }, operationTimeout(this.weight))
    })
  }
}

mixin(Software, [Equippable])
