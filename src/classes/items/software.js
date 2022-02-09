import Item from './item'
import { store } from '@/store'
import { log, mixin, operationTimeout } from '@/utils'
import Equippable from '@/mixins/equipable'
import Download from '@/mixins/download'
import Upload from '@/mixins/upload'

export default class Software extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Software',
      icon: 'whh:server',
      version: 1,
      pickable: false,
      usable: false,
      viewerType: undefined,
      busy: false,
      actions: [
        item => (
          store.player.has(item) && !item.isEquipped
            ? {
              label: 'Install',
              key: 'install',
              icon: '',
              disabled: false,
              click: () => item.install(),
            }
            : undefined
        ),
        item => (
          store.player.has(item) && item.isEquipped
            ? {
              label: 'Uninstall',
              key: 'uninstall',
              icon: '',
              disabled: false,
              click: () => item.uninstall(),
            }
            : undefined
        ),
      ],
      ...data,
    })
  }

  get isSoftware() { return true }

  get isInstalled() { return store.player.installedSoftwares.includes(this) }

  get isOnServer() { return this.location?.isServer }

  get version() { return this.state.version }
  set version(value) { this.state.version = value }

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

  get isBusy() { return this.state.busy }
  set busy(value) { this.state.busy = value }

  get canInstall() {
    if (this.isBusy) {
      log(`Software ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (!store.player.has(this)) {
      log('Software needs to be in your inventory first')
      return false
    }
    if (store.player.ramFree < this.weight) {
      log(`Not enough ram available to install this ${this.name}`)
      return false
    }
    return true
  }

  get canUninstall() {
    if (this.isBusy) {
      log(`Software ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (!store.player.has(this)) {
      log(`Software needs to be in your inventory first`)
      return false
    }
    if (!this.isEquipped) {
      log('Software needs to be installed')
      return false
    }
    return true
  }

  install() {
    if (!this.canInstall) {
      log(`You cannot install ${this.name}`)
      return false
    }
    this.busy = true
    log(`Installing ${this.name}...`)
    setTimeout(() => {
      this.busy = false
      this.equip(true)
      log(`You have successfully installed ${this.name}`)
    }, operationTimeout(this.weight))
    return true
  }

  uninstall() {
    if (!this.canUninstall) {
      log(`You cannot uninstall ${this.name}`)
      return false
    }
    this.busy = true
    log(`Uninstalling ${this.name}...`)
    setTimeout(() => {
      this.busy = false
      this.equip(false)
      log(`You have successfully uninstalled ${this.name}`)
    }, operationTimeout(this.weight))
    return true
  }
}

mixin(Software, [Equippable, Download, Upload])
