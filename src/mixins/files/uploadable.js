import { can, checkSoftware, emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    uploadable: false,
    actions: [
      item => (
        item.isUploadable && store.player.has(item)
        ? {
            label: item.uploadLabel,
            key: 'upload',
            icon: 'oi:data-transfer-upload',
            disabled: !item.canUpload(),
            click: async () => item.upload(),
          }
          : undefined
      ),
    ],
  },

  get isUploadable() { return this.state.uploadable },
  set uploadable(value) { this.state.uploadable = value },

  get uploadLabel() {
    return `Upload ${this.requirementsLabelFor('upload')}`
  },

  canUpload(showMessage) {
    return can(this, [
      {
        expr: () => !this.isUploadable,
        log: () => `${this.name} cannot be uploaded`
      },
      {
        expr: () => !store.player.isConnectedToServer,
        log: () => 'You need to be connected to a server first'
      },
      {
        expr: () => !store.player.has(this),
        log: () => `${this.name} must be on your disk first`
      },
      {
        expr: () => checkSoftware.call(this, store.player.installedFtp, showMessage),
      },
    ], showMessage, 'upload')
  },

  async upload() {
    if (!this.canUpload(true)) {
      return false
    }
    store.game.playSound('hd')
    log(`Uploading file ${this.name.toLowerCase()}...`)
    return this.operate('upload', async () => {
      store.game.stopSound('hd')
      log(`You have successfully uploaded the file ${this.name.toLowerCase()}`)
      await emit.call(this, 'onUpload')
      store.player.server.addItem(this)
    }, this.weight)
  },

  async onUpload() {},
}
