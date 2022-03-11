import File from '../server/file'
import { mixin, registerClass } from '@/utils'
import Installable from '@/mixins/installable'
import Usable from '@/mixins/usable'

export default class Software extends File {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Software',
      icon: 'software',
      examinable: true,
      installable: true,
      decryptable: false,
      viewable: false,
      pickable: true,
      dropable: true,
      actionsOrder: [
        'examine',
        'install',
        'uninstall',
        'delete',
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

registerClass(Software)
