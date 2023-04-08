/**
 * Makes an object deletable (for Files)
 */

import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { Entity, State } from '@/entity'
import { IName } from '@/mixins/name'
import { IIcon } from '@/mixins/icon'
import { IWeight } from '@/mixins/weight'
import { IOperation } from '@/mixins/operation'
import { IRequirements } from '@/mixins/requirements'

export interface IDeletable extends Entity, IName, IIcon, IWeight, IOperation, IRequirements {
  state: State
  get isDeletable(): boolean
  set deletable(value: boolean)
  get deleteLabel(): string
  canDel(showMessage?: boolean): boolean
  del(): Promise<boolean>
  onDel(): Promise<void>
}

// @ts-ignore
export const Deletable: IDeletable = {
  state: {
    // is the object deletable
    deletable: false,
    actions: [
      (item: IDeletable) => (
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
  },

  get isDeletable(): boolean { return this.state.deletable },
  set deletable(value: boolean) { this.state.deletable = value },

  get deleteLabel(): string {
    return `Delete ${this.requirementsLabelFor('delete')}`
  },

  canDel(showMessage?: boolean) {
    return can(this, [
      {
        expr: () => !this.isDeletable,
        log: () => `${this.nameProper} cannot be deleted`
      },
      {
        expr: () => (this as any).isInstalled,
        log: () => `${this.nameProper} needs to be uninstalled first`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedDeleter, showMessage),
      },
    ], showMessage, 'del')
  },

  async del(): Promise<boolean> {
    if (!this.canDel(true)) {
      return false
    }
    if ((this as any).isOnServer) {
      window.store.game.playSound('hd')
    }
    log(`Deleting file ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('del', async () => {
      window.store.game.stopSound('hd')
      this.remove()
      log(`You have successfully deleted the file ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onDel')
      return true
    }, this.weight)
  },

  async onDel(): Promise<void> {}
}
