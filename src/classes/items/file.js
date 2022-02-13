import Item from './item'
import { mixin } from '@/utils'
import Version from '@/mixins/version'
import Viewable from '@/mixins/files/viewable'
import Deletable from '@/mixins/files/deletable'
import Decryptable from '@/mixins/files/decryptable'
import Downloadable from '@/mixins/files/downloadable'
import Uploadable from '@/mixins/files/uploadable'

export default class File extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'File',
      icon: 'fa-solid:file',
      pickable: false,
      dropable: false,
      unlockable: false,
      usable: false,
      examinable: false,
      hidden: true,
      ...data,
    })
  }

  get isFile() { return true }

  get isOnServer() { return this.location?.isServer }

  get isVisible() { return !this.isOnServer || !this.state.hidden }
  set hidden(value) { this.state.hidden = value }
}

mixin(File, [
  Version,
  Viewable,
  Deletable,
  Decryptable,
  Downloadable,
  Uploadable,
])
