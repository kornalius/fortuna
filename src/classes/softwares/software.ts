import { File, IFileData } from '../server/file'
import { mixin, registerClass } from '@/utils'
import { IInstallable, IInstallableData, Installable } from '@/mixins/installable'
import { IUsable, IUsableData, Usable } from '@/mixins/usable'
import { SetupData } from '@/entity'

export interface ISoftwareData extends
  IFileData,
  IInstallableData,
  IUsableData
{}

export interface Software extends
  File,
  IInstallable,
  IUsable
{}

export class Software extends File {
  constructor(data?: ISoftwareData) {
    super(data)
  }

  setupInstance(data?: ISoftwareData): SetupData | undefined {
    return super.setupInstance({
      name: 'Software',
      icon: 'software',
      examinable: true,
      installable: true,
      decryptable: false,
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
