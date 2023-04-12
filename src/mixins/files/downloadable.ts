/**
 * Makes an object downloadable (for Files)
 */

import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { Entity, IEntityData, State } from '@/entity'
import { IName, INameData } from '@/mixins/name'
import { IRequirements, IRequirementsData } from '@/mixins/requirements'
import { IWeight, IWeightData } from '@/mixins/weight'
import { IOperation, IOperationData } from '@/mixins/operation'
import { IActions, IActionsData, IDropdownItem } from '@/mixins/actions'

export interface IDownloadableData extends
  IEntityData,
  INameData,
  IRequirementsData,
  IWeightData,
  IOperationData,
  IActionsData
{
  // is the object downloadable
  downloadable?: boolean
  onDownload?: () => Promise<void>
}

export interface IDownloadable extends
  Entity,
  IName,
  IRequirements,
  IWeight,
  IOperation,
  IActions
{
  state: State
  get isDownloadable(): boolean
  set downloadable(value: boolean)
  get downloadLabel(): string
  canDownload(showMessage?: boolean): boolean
  download(): Promise<boolean>
  onDownload(): Promise<void>
}

// @ts-ignore
export const Downloadable: IDownloadable = {
  state: {
    downloadable: false,
    actions: [
      (item: IDownloadable): IDropdownItem | undefined => (
        item.isDownloadable && (item as any).isOnServer
        ? {
            label: item.downloadLabel,
            key: 'download',
            icon: 'download',
            disabled: !item.canDownload(),
            click: () => item.download(),
          }
          : undefined
      ),
    ],
  } as IDownloadableData,

  get isDownloadable(): boolean { return this.state.downloadable },
  set downloadable(value: boolean) { this.state.downloadable = value },

  get downloadLabel(): string { return `Download ${this.requirementsLabelFor('download')}` },

  canDownload(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isDownloadable,
        log: () => `${this.nameProper} cannot be downloaded`
      },
      {
        expr: () => !(this as any).isOnServer,
        log: () => `${this.nameProper} needs to be hosted on a server to be downloaded`
      },
      {
        expr: () => window.store.player.diskFree < this.weight,
        log: () => `Not enough free disk space left to download ${this.nameDisplay}`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedFtp, showMessage),
      },
    ], showMessage, 'download')
  },

  async download(): Promise<boolean> {
    if (!this.canDownload(true)) {
      return false
    }
    window.store.game.playSound('hd')
    log(`Downloading file ${this.nameDisplay}...`, LOG_WARN, this.icon)
    return this.operate('download', async () => {
      window.store.game.stopSound('hd')
      log(`You have successfully downloaded the file ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onDownload')
      window.store.player.addItem(this)
      return true
    }, this.weight)
  },

  async onDownload(): Promise<void> {},
}
