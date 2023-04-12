/**
 * Makes an object deletable (for Files)
 */

import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { Entity, State } from '@/entity'
import { IName, INameSetupData } from '@/mixins/name'
import { IIcon, IIconSetupData } from '@/mixins/icon'
import { IWeight, IWeightSetupData } from '@/mixins/weight'
import { IOperation, IOperationSetupData } from '@/mixins/operation'
import { IRequirements, IRequirementsSetupData } from '@/mixins/requirements'
import { IActions, IActionsSetupData, IDropdownItem } from '@/mixins/actions'

export interface IDeletableSetupData extends
  INameSetupData,
  IIconSetupData,
  IWeightSetupData,
  IOperationSetupData,
  IRequirementsSetupData,
  IActionsSetupData
{
  // is the object deletable
  deletable?: boolean
}

export interface IDeletable extends
  Entity,
  IName,
  IIcon,
  IWeight,
  IOperation,
  IRequirements,
  IActions
{
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
    deletable: false,
    actions: [
      (item: IDeletable): IDropdownItem | undefined => (
        item.isDeletable
          ? {
            label: item.deleteLabel,
            key: 'delete',
            icon: 'delete',
            disabled: !item.canDel(),
            click: item.del,
          }
          : undefined
      ),
    ],
  } as IDeletableSetupData,

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
