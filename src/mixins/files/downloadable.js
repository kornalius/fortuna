import { can, checkSoftware, emit, log } from '@/utils'
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
    return can(this, [
      {
        expr: () => !this.isDownloadable,
        log: () => `${this.name} cannot be downloaded`
      },
      {
        expr: () => !this.isOnServer,
        log: () => `${this.name} needs to be hosted on a server to be downloaded`
      },
      {
        expr: () => store.player.diskFree < this.weight,
        log: () => `Not enough free disk space left to download ${this.name.toLowerCase()}`
      },
      {
        expr: () => !checkSoftware.call(this, store.player.installedFtp, showMessage),
      },
    ], showMessage, 'download')
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
