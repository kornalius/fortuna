import { checkSoftware, emit, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    deletable: true,
    actions: [
      item => (
        item.canDel()
          ? {
            label: 'Delete',
            key: 'delete',
            icon: 'fluent:delete-24-filled',
            disabled: false,
            click: async () => item.del(),
          }
          : undefined
      ),
    ],
  },

  get isDeletable() { return this.state.deletable },
  set deletable(value) { this.state.deletable = value },

  get isDeleting() { return store.player.installedDeleter?.busy },
  set deleting(value) { this.setBusy(store.player.installedDeleter, value) },

  canDel(showMessage) {
    if (!this.isDeletable) {
      if (showMessage) {
        log(`${this.name} cannot be deleted`)
      }
      return false
    }
    if (this.isEquipped) {
      if (showMessage) {
        log(`${this.name} needs to be uninstalled first`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedDeleter,showMessage && 'deleter')
  },

  async del() {
    if (!this.canDel(true)) {
      return false
    }
    this.deleting = true
    log(`Deleting file ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.deleting = false
        this.remove()
        log(`You have successfully deleted the file ${this.name.toLowerCase()}`)
        await emit.call(this, 'onDel')
        resolve(true)
      }, operationTimeout(this.weight))
    })
  },

  async onDel() {},
}
