import { log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    actions: [
      item => (
        item.isOnServer && store.player.server === item.location
          ? {
            label: 'Download',
            key: 'download',
            icon: 'oi:data-transfer-download',
            disabled: false,
            click: () => item.download(),
          }
          : undefined
      ),
    ],
  },

  get isDownloading() {
    if (this.isFile) {
      return this.state.busy === 'downloading'
    }
    return this.state.busy
  },

  set downloading(value) {
    if (this.isFile) {
      this.state.busy = value ? 'downloading' : undefined
    } else {
      this.state.busy = value
    }
  },

  get canDownload() {
    if (this.isBusy) {
      log(`File ${this.name} is locked while an operation is running on it`)
      return false
    }
    return this.checkAction(store.player.installedDownloader, () => (
      store.player.diskFree >= this.weight
    ))
  },

  download() {
    if (!this.canDownload) {
      log(`You cannot download the file ${this.name}`)
      return false
    }
    this.downloading = true
    log(`Downloading file ${this.name}...`)
    setTimeout(() => {
      this.downloading = false
      store.player.addItem(this)
      log(`You have successfully downloaded the file ${this.name}`)
    }, operationTimeout(this.weight))
    return true
  },
}
