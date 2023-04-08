import { mixin, registerClass } from '@/utils'
import { Item } from '../items/item'
import { IVersion, Version } from '@/mixins/version'
import { IViewable, Viewable } from '@/mixins/files/viewable'
import { IDeletable, Deletable } from '@/mixins/files/deletable'
import { IDecryptable, Decryptable } from '@/mixins/files/decryptable'
import { IDownloadable, Downloadable } from '@/mixins/files/downloadable'
import { IUploadable, Uploadable } from '@/mixins/files/uploadable'
import { SetupData } from '@/entity'

export interface File extends
  Item,
  IVersion,
  IViewable,
  IDeletable,
  IDecryptable,
  IDownloadable,
  IUploadable
{}

export class File extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'File',
      icon: 'file',
      pickable: false,
      dropable: false,
      usable: false,
      hidden: true,
      ...(data || {})
    })
  }

  get isFile(): boolean { return true }

  get isOnServer(): boolean { return this.location?.isServer }

  get isVisible(): boolean { return !this.isOnServer || !this.state.hidden }
  set hidden(value: boolean) { this.state.hidden = value }
}

mixin(File, [
  Version,
  Viewable,
  Deletable,
  Decryptable,
  Downloadable,
  Uploadable,
])

registerClass(File)
