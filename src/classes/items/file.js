import Item from './item'
import { mixin } from '@/utils'
import Viewable from '@/mixins/viewable'
import Deletable from '@/mixins/deletable'
import Decryptable from '@/mixins/decryptable'
import Downloadable from '@/mixins/downloadable'
import Uploadable from '@/mixins/uploadable'

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
