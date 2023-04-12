import { registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { SetupData } from '@/entity'

export class Thumbdrive extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Thumb drive',
      icon: 'thumbDrive',
      ...(data || {})
    })
  }
}

registerClass(Thumbdrive)
