import { checkSoftware, emit, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    uploadable: true,
    actions: [
      item => (
        item.canUpload()
          ? {
            label: 'Upload',
            key: 'upload',
            icon: 'oi:data-transfer-upload',
            disabled: false,
            click: async () => item.upload(),
          }
          : undefined
      ),
    ],
  },

  get isUploadable() { return this.state.uploadable },
  set uploadable(value) { this.state.uploadable = value },

  get isUploading() { return store.player.installedUploader?.busy },
  set uploading(value) { this.setBusy(store.player.installedUploader, value) },

  canUpload(showMessage) {
    if (!this.isUploadable) {
      if (showMessage) {
        log(`${this.name} cannot be uploaded`)
      }
      return false
    }
    if (!store.player.isConnectedToServer) {
      if (showMessage) {
        log('You need to be connected to a server first')
      }
      return false
    }
    if (!store.player.has(this)) {
      if (showMessage) {
        log(`${this.name} must be on your disk first`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedUploader, showMessage)
  },

  async upload() {
    if (!this.canUpload(true)) {
      return false
    }
    this.uploading = true
    log(`Uploading file ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.uploading = false
        store.player.server.addItem(this)
        log(`You have successfully uploaded the file ${this.name.toLowerCase()}`)
        await emit.call(this, 'onUpload')
        resolve(true)
      }, operationTimeout(this.weight))
    })
  },

  async onUpload() {},
}
