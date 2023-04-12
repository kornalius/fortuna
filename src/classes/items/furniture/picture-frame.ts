import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class PictureFrame extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Picture frame',
      icon: 'pictureFrame',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(PictureFrame)
