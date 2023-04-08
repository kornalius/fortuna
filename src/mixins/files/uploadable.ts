import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { Name } from '@/mixins/name'
import { Icon } from '@/mixins/icon'
import { Weight } from '@/mixins/weight'
import { IRequirements } from '@/mixins/requirements'
import { Operation } from '@/mixins/operation'

/**
 * Makes an object uploadable (for Files)
 */

export interface Uploadable extends Name, Icon, Weight, IRequirements, Operation {}

export class Uploadable {
  state: State = {
    // is the object uploadable
    uploadable: false,
    actions: [
      (item: Uploadable) => (
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
  }

  get isUploadable(): boolean { return this.state.uploadable }
  set uploadable(value: boolean) { this.state.uploadable = value }

  get uploadLabel() {
    return `Upload ${this.requirementsLabelFor('upload')}`
  }

  canUpload(showMessage?: boolean) {
    return can(this, [
      {
        expr: () => !this.isUploadable,
        log: () => `${this.name} cannot be uploaded`
      },
      {
        expr: () => !window.store.player.isConnectedToServer,
        log: () => 'You need to be connected to a server first'
      },
      {
        expr: () => !window.store.player.has(this),
        log: () => `${this.name} must be on your disk first`
      },
      {
        expr: () => checkSoftware(this, window.store.player.installedFtp, showMessage),
      },
    ], showMessage, 'upload')
  }

  async upload() {
    if (!this.canUpload(true)) {
      return false
    }
    window.store.game.playSound('hd')
    log(`Uploading file ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('upload', async () => {
      window.store.game.stopSound('hd')
      log(`You have successfully uploaded the file ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit(this, 'onUpload')
      window.store.player.server.addItem(this)
    }, this.weight)
  }

  async onUpload() {}
}
