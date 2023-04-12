/**
 * Makes an object uploadable (for Files)
 */

import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { Entity, IEntityData, State } from '@/entity'
import { IName, INameData } from '@/mixins/name'
import { IIcon, IIconData } from '@/mixins/icon'
import { IWeight, IWeightData } from '@/mixins/weight'
import { IRequirements, IRequirementsData } from '@/mixins/requirements'
import { IOperation, IOperationData } from '@/mixins/operation'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IUploadableData extends
  IEntityData,
  INameData,
  IIconData,
  IWeightData,
  IRequirementsData,
  IOperationData,
  IActionsData
{
  // is the object uploadable
  uploadable?: boolean
  onUpload?: () => Promise<void>
}

export interface IUploadable extends
  Entity,
  IName,
  IIcon,
  IWeight,
  IRequirements,
  IOperation,
  IActions
{
  state: State
  get isUploadable(): boolean
  set uploadable(value: boolean)
  get uploadLabel(): string
  canUpload(showMessage?: boolean): boolean
  upload(): Promise<boolean>
  onUpload(): Promise<void>
}

// @ts-ignore
export const Uploadable: IUploadable = {
  state: {
    uploadable: false,
    actions: [
      (item: IUploadable): IDropdownItem | undefined => (
        item.isUploadable && window.store.player.has(item)
        ? {
            label: item.uploadLabel,
            key: 'upload',
            icon: 'upload',
            disabled: !item.canUpload(),
            click: () => item.upload(),
          }
          : undefined
      ),
    ],
  } as IUploadableData,

  get isUploadable(): boolean { return this.state.uploadable },
  set uploadable(value: boolean) { this.state.uploadable = value },

  get uploadLabel(): string { return `Upload ${this.requirementsLabelFor('upload')}` },

  canUpload(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isUploadable,
        log: () => `${this.nameProper} cannot be uploaded`
      },
      {
        expr: () => !window.store.player.isConnectedToServer,
        log: () => 'You need to be connected to a server first'
      },
      {
        expr: () => !window.store.player.has(this),
        log: () => `${this.nameProper} must be on your disk first`
      },
      {
        expr: () => checkSoftware(this, window.store.player.installedFtp, showMessage),
      },
    ], showMessage, 'upload')
  },

  async upload(): Promise<boolean> {
    if (!this.canUpload(true)) {
      return false
    }
    window.store.game.playSound('hd')
    log(`Uploading file ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('upload', async () => {
      window.store.game.stopSound('hd')
      log(`You have successfully uploaded the file ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onUpload')
      window.store.player.server?.addFile(this)
      return true
    }, this.weight)
  },

  async onUpload(): Promise<void> {},
}
