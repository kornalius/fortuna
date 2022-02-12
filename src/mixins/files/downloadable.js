import { checkSoftware, emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    downloadable: false,
    actions: [
      item => (
        item.canDownload()
          ? {
            label: 'Download',
            key: 'download',
            icon: 'oi:data-transfer-download',
            disabled: false,
            click: async () => item.download(),
          }
          : undefined
      ),
    ],
  },

  get isDownloadable() { return this.state.downloadable },
  set downloadable(value) { this.state.downloadable = value },

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
    return checkSoftware.call(this, store.player.installedFtp, showMessage)
  },

  async download() {
    if (!this.canDownload(true)) {
      return false
    }
    log(`Downloading file ${this.name.toLowerCase()}...`)
    return this.operate('download', async () => {
      log(`You have successfully downloaded the file ${this.name.toLowerCase()}`)
      await emit.call(this, 'onDownload')
      store.player.addItem(this)
    }, this.weight)
  },

  async onDownload() {},
}
