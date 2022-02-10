import { checkSoftware, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    downloadable: true,
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

  get isDownloading() { return store.player.installedDownloader?.busy },
  set downloading(value) { this.setBusy(store.player.installedDownloader, value) },

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
        log(`Not enough free disk space left to download ${this.name}`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedDownloader,showMessage && 'downloader')
  },

  async download() {
    if (!this.canDownload(true)) {
      return false
    }
    this.downloading = true
    log(`Downloading file ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(() => {
        this.downloading = false
        store.player.addItem(this)
        log(`You have successfully downloaded the file ${this.name}`)
        resolve(true)
      }, operationTimeout(this.weight))
    })
  },
}
