/**
 * Makes an object uploadable (for Files)
 */

import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from '@/mixins/name'
import { IIcon } from '@/mixins/icon'
import { IWeight } from '@/mixins/weight'
import { IRequirements } from '@/mixins/requirements'
import { IOperation } from '@/mixins/operation'

export interface IUploadable extends IName, IIcon, IWeight, IRequirements, IOperation {
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
    // is the object uploadable
    uploadable: false,
    actions: [
      (item: IUploadable) => (
        item.isUploadable && window.store.player.has(item)
        ? {
            label: item.uploadLabel,
            key: 'upload',
            icon: 'upload',
            disabled: !item.canUpload(),
            click: async () => item.upload(),
          }
          : undefined
      ),
    ],
  },

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
