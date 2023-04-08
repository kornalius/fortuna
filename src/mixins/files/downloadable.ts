import { can, checkSoftware, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { Name } from '@/mixins/name'
import { IRequirements } from '@/mixins/requirements'
import { Weight } from '@/mixins/weight'
import { Operation } from '@/mixins/operation'

/**
 * Makes an object downloadable (for Files)
 */

export interface Downloadable extends Name, IRequirements, Weight, Operation {}

export class Downloadable {
  state: State = {
    // is the object downloadable
    downloadable: false,
    actions: [
      (item: Downloadable) => (
        item.isDownloadable && (item as any).isOnServer
        ? {
            label: item.downloadLabel,
            key: 'download',
            icon: 'download',
            disabled: !item.canDownload(),
            click: async () => item.download(),
          }
          : undefined
      ),
    ],
  }

  get isDownloadable(): boolean { return this.state.downloadable }
  set downloadable(value: boolean) { this.state.downloadable = value }

  get downloadLabel() {
    return `Download ${this.requirementsLabelFor('download')}`
  }

  canDownload(showMessage?: boolean) {
    return can(this, [
      {
        expr: () => !this.isDownloadable,
        log: () => `${this.name} cannot be downloaded`
      },
      {
        expr: () => !(this as any).isOnServer,
        log: () => `${this.name} needs to be hosted on a server to be downloaded`
      },
      {
        expr: () => window.store.player.diskFree < this.weight,
        log: () => `Not enough free disk space left to download ${this.name.toLowerCase()}`
      },
      {
        expr: () => !checkSoftware(this, window.store.player.installedFtp, showMessage),
      },
    ], showMessage, 'download')
  }

  async download() {
    if (!this.canDownload(true)) {
      return false
    }
    window.store.game.playSound('hd')
    log(`Downloading file ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    return this.operate('download', async () => {
      window.store.game.stopSound('hd')
      log(`You have successfully downloaded the file ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit(this, 'onDownload')
      window.store.player.addItem(this)
    }, this.weight)
  }

  async onDownload() {}
}
