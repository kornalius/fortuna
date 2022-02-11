import Item from './item'
import { mixin } from '@/utils'
import Viewable from '@/mixins/files/viewable'
import Deletable from '@/mixins/files/deletable'
import Decryptable from '@/mixins/softwares/decryptable'
import Downloadable from '@/mixins/files/downloadable'
import Uploadable from '@/mixins/files/uploadable'

export default class File extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'File',
      icon: 'fa-solid:file',
      version: 1,
      pickable: false,
      dropable: false,
      unlockable: false,
      usable: false,
      busy: false,
      ...data,
    })
  }

  get isFile() { return true }

  get isOnServer() { return this.location?.isServer }

  get version() { return this.state.version }
  set version(value) { this.state.version = value }

  get isBusy() { return this.state.busy }
  set busy(value) { this.state.busy = value }
}

mixin(File, [Viewable, Deletable, Decryptable, Downloadable, Uploadable])
