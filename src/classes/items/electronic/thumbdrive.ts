import { registerClass } from '@/utils'
import { Item, IItemSetupData } from '../item'
import { SetupData } from '@/entity'

export class Thumbdrive extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Thumb drive',
      icon: 'thumbDrive',
      ...(data || {})
    })
  }
}

registerClass(Thumbdrive)
