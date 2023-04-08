import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { Entity, State } from '@/entity'
import { Name } from '@/mixins/name'
import { Icon } from '@/mixins/icon'
import { Weight } from '@/mixins/weight'
import { Operation } from '@/mixins/operation'
import { IRequirements } from '@/mixins/requirements'

/**
 * Makes an object deletable (for Files)
 */

export interface Deletable extends Entity, Name, Icon, Weight, Operation, IRequirements {}

export class Deletable {
  state: State = {
    // is the object deletable
    deletable: false,
    actions: [
      (item: Deletable) => (
        item.isDeletable
          ? {
            label: item.deleteLabel,
            key: 'delete',
            icon: 'delete',
            disabled: !item.canDel(),
            click: async () => item.del(),
          }
          : undefined
      ),
    ],
  }

  get isDeletable(): boolean { return this.state.deletable }
  set deletable(value: boolean) { this.state.deletable = value }

  get deleteLabel(): string {
    return `Delete ${this.requirementsLabelFor('delete')}`
  }

  canDel(showMessage?: boolean) {
    return can(this, [
      {
        expr: () => !this.isDeletable,
        log: () => `${this.name} cannot be deleted`
      },
      {
        expr: () => (this as any).isInstalled,
        log: () => `${this.name} needs to be uninstalled first`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedDeleter, showMessage),
      },
    ], showMessage, 'del')
  }

  async del() {
    if (!this.canDel(true)) {
      return false
    }
    if ((this as any).isOnServer) {
      window.store.game.playSound('hd')
    }
    log(`Deleting file ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('del', async () => {
      window.store.game.stopSound('hd')
      this.remove()
      log(`You have successfully deleted the file ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit(this, 'onDel')
    }, this.weight)
  }

  async onDel() {}
}
