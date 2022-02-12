import { checkSoftware, emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    deletable: false,
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
    return checkSoftware.call(this, store.player.installedDeleter,showMessage)
  },

  async del() {
    if (!this.canDel(true)) {
      return false
    }
    log(`Deleting file ${this.name.toLowerCase()}...`)
    return this.operate('del', async () => {
      this.remove()
      log(`You have successfully deleted the file ${this.name.toLowerCase()}`)
      await emit.call(this, 'onDel')
    }, this.weight)
  },

  async onDel() {},
}
