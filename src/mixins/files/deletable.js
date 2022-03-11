import { can, checkSoftware, emit, log } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object deletable (for Files)
 */

export default {
  state: {
    // is the object deletable
    deletable: false,
    actions: [
      item => (
        item.isDeletable
          ? {
            label: item.deleteLabel,
            key: 'delete',
            icon: 'fluent:delete-24-filled',
            disabled: !item.canDel(),
            click: async () => item.del(),
          }
          : undefined
      ),
    ],
  },

  get isDeletable() { return this.state.deletable },
  set deletable(value) { this.state.deletable = value },

  get deleteLabel() {
    return `Delete ${this.requirementsLabelFor('delete')}`
  },

  canDel(showMessage) {
    return can(this, [
      {
        expr: () => !this.isDeletable,
        log: () => `${this.name} cannot be deleted`
      },
      {
        expr: () => this.isInstalled,
        log: () => `${this.name} needs to be uninstalled first`
      },
      {
        expr: () => !checkSoftware.call(this, store.player.installedDeleter,showMessage),
      },
    ], showMessage, 'del')
  },

  async del() {
    if (!this.canDel(true)) {
      return false
    }
    if (this.isOnServer) {
      store.game.playSound('hd')
    }
    log(`Deleting file ${this.name.toLowerCase()}...`)
    return this.operate('del', async () => {
      store.game.stopSound('hd')
      this.remove()
      log(`You have successfully deleted the file ${this.name.toLowerCase()}`)
      await emit.call(this, 'onDel')
    }, this.weight)
  },

  async onDel() {},
}
