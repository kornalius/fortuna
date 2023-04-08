import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Thumbdrive extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Thumb drive',
      icon: 'thumbDrive',
      ...(data || {})
    })
  }
}

registerClass(Thumbdrive)
