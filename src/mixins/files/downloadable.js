import { checkSoftware, emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    downloadable: false,
    actions: [
      item => (
        item.isDownloadable && item.isOnServer
        ? {
            label: item.downloadLabel,
            key: 'download',
            icon: 'oi:data-transfer-download',
            disabled: !item.canDownload(),
            click: async () => item.download(),
          }
          : undefined
      ),
    ],
  },

  get isDownloadable() { return this.state.downloadable },
  set downloadable(value) { this.state.downloadable = value },

  get downloadLabel() {
    return `Download ${this.requirementsLabelFor('download')}`
  },

  canDownload(showMessage) {
    if (!this.isDownloadable) {
      if (showMessage) {
        log(`${this.name} cannot be downloaded`)
      }
      return false
    }
    if (!this.isOnServer) {
      if (showMessage) {
        log(`${this.name} needs to be hosted on a server to be downloaded`)
      }
      return false
    }
    if (store.player.diskFree < this.weight) {
      if (showMessage) {
        log(`Not enough free disk space left to download ${this.name.toLowerCase()}`)
      }
      return false
    }
    if (this.checkRequirementsFor && !this.checkRequirementsFor('download', showMessage)) {
      return false
    }
    return checkSoftware.call(this, store.player.installedFtp, showMessage)
  },

  async download() {
    if (!this.canDownload(true)) {
      return false
    }
    store.game.playSound('hd')
    log(`Downloading file ${this.name.toLowerCase()}...`)
    return this.operate('download', async () => {
      store.game.stopSound('hd')
      log(`You have successfully downloaded the file ${this.name.toLowerCase()}`)
      await emit.call(this, 'onDownload')
      store.player.addItem(this)
    }, this.weight)
  },

  async onDownload() {},
}
