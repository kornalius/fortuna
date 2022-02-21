import File from '../items/file'
import { mixin } from '@/utils'
import Installable from '@/mixins/installable'
import Usable from '@/mixins/usable'

export default class Software extends File {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Software',
      icon: 'whh:software',
      installable: true,
      decryptable: false,
      viewable: false,
      pickable: true,
      dropable: true,
      actionsOrder: [
        'install',
        'uninstall',
      ],
      ...data,
    })
  }

  get isSoftware() { return true }

  get isFile() { return false }

  get content() { return undefined }
  set content(value) {}

  get isTextFile() { return false }
  get isImageFile() { return false }

  get isViewed() { return false }
  set viewed(value) {}

  get icon() { return this.state.icon }
}

mixin(Software, [
  Installable,
  Usable,
])
