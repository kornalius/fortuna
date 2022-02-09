import Item from './item'
import { store } from '@/store'
import { log, mixin, operationTimeout } from '@/utils'
import Download from '@/mixins/download'
import Upload from '@/mixins/upload'

export default class File extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'File',
      icon: 'whh:server',
      version: 1,
      pickable: false,
      usable: false,
      crypted: false,
      viewed: false,
      type: undefined,
      content: '',
      busy: undefined,
      actions: [
        item => ({
          label: 'View',
          key: 'view',
          icon: 'healthicons:magnifying-glass',
          disabled: false,
          click: () => item.view(),
        }),
        item => (
          store.player.has(item) && item.crypted
            ? {
              label: 'Decrypt',
              key: 'decrypt',
              icon: 'carbon:encryption',
              disabled: false,
              click: () => item.decrypt(),
            }
            : undefined
        ),
      ],
      ...data,
    })
  }

  get isFile() { return true }

  get isOnServer() { return this.location?.isServer }

  get version() { return this.state.version }
  set version(value) { this.state.version = value }

  get type() { return this.state.type }
  set type(value) { this.state.type = value }

  get content() { return this.state.content }
  set content(value) { this.state.content = value }

  get isTextFile() { return this.type === 'txt' }
  get isImageFile() { return this.type === 'img' }

  get isCrypted() { return this.state.crypted }
  set crypted(value) { this.state.crypted = value }

  get isViewed() { return this.state.viewed }
  set viewed(value) { this.state.viewed = value }

  get isBusy() { return this.state.busy }
  set busy(value) { this.state.busy = value }

  get isDeleting() { return this.state.busy === 'deleting' }
  set deleting(value) { this.state.busy = value ? 'deleting' : undefined }

  get isDecrypting() { return this.state.busy === 'decrypting' }
  set decrypting(value) { this.state.busy = value ? 'decrypting' : undefined }

  get canView() {
    return this.checkAction(store.player.installedViewer, viewer => viewer?.viewerType === this.type)
  }

  get canDel() { return this.checkAction(store.player.installedDeleter) }

  get canDecrypt() { return this.checkAction(store.player.installedDecrypter) }

  checkAction(software, check) {
    if (this.isBusy) {
      log(`File ${this.name} is locked while an operation is running on it`)
      return false
    }
    return software?.version >= this.version
      && (!check || check(this, software))
  }

  view() {
    if (!this.canDecrypt) {
      log('You cannot decrypt this file')
      return false
    }
    this.viewed = true
    log('File: this.name', 1)
    log('---------------------------------')
    log(this.content)
    return true
  }

  del() {

  }

  decrypt() {
    if (!this.canDecrypt) {
      log(`You cannot decrypt the file ${this.name}`)
      return false
    }
    if (!this.isCrypted) {
      log(`File ${this.name} is not crypted`)
      return false
    }
    this.decrypting = true
    log(`Decrypting file ${this.name}...`)
    setTimeout(() => {
      this.decrypting = false
      this.crypted = false
      log(`You have successfully decrypted the file ${this.name}`)
    }, operationTimeout(this.version))
    return true
  }
}

mixin(File, [Download, Upload])
