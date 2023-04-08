import { Item } from '../items/item'
import { mixin, registerClass } from '@/utils'
import { Version } from '@/mixins/version'
import { Viewable } from '@/mixins/files/viewable'
import { Deletable } from '@/mixins/files/deletable'
import { Decryptable } from '@/mixins/files/decryptable'
import { Downloadable } from '@/mixins/files/downloadable'
import { Uploadable } from '@/mixins/files/uploadable'
import { SetupData } from '@/entity'

export interface File extends Item, Version, Viewable, Deletable, Decryptable, Downloadable, Uploadable {}

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
