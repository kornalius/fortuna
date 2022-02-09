import { log, operationTimeout } from '@/utils'
import { store } from '@/store';

export default {
  state: {
    actions: [
      item => (
        store.player.has(item) && !item.isEquipped
          ? {
            label: 'Delete',
            key: 'delete',
            icon: 'fluent:delete-24-filled',
            disabled: false,
            click: () => item.del(),
          }
          : undefined
      ),
    ],
  },

  get isDeleting() {
    if (this.isFile) {
      return this.state.busy === 'deleting'
    }
    return this.state.busy
  },

  set deleting(value) {
    if (this.isFile) {
      this.state.busy = value ? 'deleting' : undefined
    } else {
      this.state.busy = value
    }
  },

  get canDelete() {
    if (this.isBusy) {
      log(`File ${this.name} is locked while an operation is running on it`)
      return false
    }
    if (this.isEquipped) {
      log(`Software ${this.name} needs to be uninstall first`)
      return false
    }
    return true
  },

  del() {
    if (!this.canDelete) {
      log(`You cannot delete the file ${this.name}`)
      return false
    }
    this.deleting = true
    log(`Deleting file ${this.name}...`)
    setTimeout(() => {
      this.deleting = false
      this.remove()
      log(`You have successfully deleted the file ${this.name}`)
    }, operationTimeout(this.weight))
    return true
  },
}
