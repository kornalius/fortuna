import { File } from '../server/file'
import { mixin, registerClass } from '@/utils'
import { Installable } from '@/mixins/installable'
import { IUsable } from '@/mixins/usable'
import { SetupData } from '@/entity'

export interface Software extends File, Installable, IUsable {}

export class Software extends File {
  setupInstance(data?: SetupData): SetupData | undefined {
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
        'use',
        'install',
        'uninstall',
        'delete',
      ],
      ...(data || {})
    })
  }

  get isSoftware(): boolean { return true }

  get isFile(): boolean { return false }

  get content(): string | null { return null }
  set content(value) {}

  get isTextFile(): boolean { return false }
  get isImageFile(): boolean { return false }

  get isViewed(): boolean { return false }
}

mixin(Software, [
  Installable,
  Usable,
])

registerClass(Software)
