import { mixin, registerClass } from '@/utils'
import { IItemSetupData, Item } from '../items/item'
import { IVersion, IVersionSetupData, Version } from '@/mixins/version'
import { IViewable, IViewableSetupData, Viewable } from '@/mixins/files/viewable'
import { IDeletable, IDeletableSetupData, Deletable } from '@/mixins/files/deletable'
import { IDecryptable, IDecryptableSetupData, Decryptable } from '@/mixins/files/decryptable'
import { IDownloadable, IDownloadableSetupData, Downloadable } from '@/mixins/files/downloadable'
import { IUploadable, IUploadableSetupData, Uploadable } from '@/mixins/files/uploadable'
import { IHidden, IHiddenSetupData, Hidden } from '@/mixins/hidden'
import { SetupData } from '@/entity'

export interface IFileSetupData extends
  IItemSetupData,
  IVersionSetupData,
  IViewableSetupData,
  IDeletableSetupData,
  IDecryptableSetupData,
  IDownloadableSetupData,
  IUploadableSetupData,
  IHiddenSetupData
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
  constructor(data?: IFileSetupData) {
    super(data)
  }

  setupInstance(data?: IFileSetupData): SetupData | undefined {
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
