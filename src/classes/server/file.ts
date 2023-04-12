import { mixin, registerClass } from '@/utils'
import { IItemData, Item } from '../items/item'
import { IVersion, IVersionData, Version } from '@/mixins/version'
import { IViewable, IViewableData, Viewable } from '@/mixins/files/viewable'
import { IDeletable, IDeletableData, Deletable } from '@/mixins/files/deletable'
import { IDecryptable, IDecryptableData, Decryptable } from '@/mixins/files/decryptable'
import { IDownloadable, IDownloadableData, Downloadable } from '@/mixins/files/downloadable'
import { IUploadable, IUploadableData, Uploadable } from '@/mixins/files/uploadable'
import { IHidden, IHiddenData, Hidden } from '@/mixins/hidden'
import { SetupData } from '@/entity'

export interface IFileData extends
  IItemData,
  IVersionData,
  IViewableData,
  IDeletableData,
  IDecryptableData,
  IDownloadableData,
  IUploadableData,
  IHiddenData
{
  // file size
  size?: number
}

export interface File extends
  Item,
  IVersion,
  IViewable,
  IDeletable,
  IDecryptable,
  IDownloadable,
  IUploadable,
  IHidden
{}

export class File extends Item {
  constructor(data?: IFileData) {
    super(data)
  }

  setupInstance(data?: IFileData): SetupData | undefined {
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
  Hidden,
])

registerClass(File)
