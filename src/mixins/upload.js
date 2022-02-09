import { log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    actions: [
      item => (
        !item.isOnServer && store.player.isConnectedToServer
          ? {
            label: 'Upload',
            key: 'upload',
            icon: 'oi:data-transfer-upload',
            disabled: false,
            click: () => item.upload(),
          }
          : undefined
      ),
    ],
  },

  get isUploading() {
    if (this.isFile) {
      return this.state.busy === 'uploading'
    }
    return this.state.busy
  },

  set uploading(value) {
    if (this.isFile) {
      this.state.busy = value ? 'uploading' : undefined
    } else {
      this.state.busy = value
    }
  },

  get canUpload() {
    if (this.isBusy) {
      log(`File ${this.name} is locked while an operation is running on it`)
      return false
    }
    return this.checkAction('installedUploader', () => (
      store.player.has(this) && store.player.isConnectedToServer
    ))
  },

  upload() {
    if (!this.canUpload) {
      log(`You cannot upload the file ${this.name}`)
      return false
    }
    this.uploading = true
    log(`Uploading file ${this.name}...`)
    setTimeout(() => {
      this.uploading = false
      store.player.server.addItem(this)
      log(`You have successfully uploaded the file ${this.name}`)
    }, operationTimeout(this.weight))
    return true
  },
}
