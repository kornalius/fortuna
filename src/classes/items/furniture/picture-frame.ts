import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class PictureFrame extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
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
