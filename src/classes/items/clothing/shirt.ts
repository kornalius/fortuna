import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Shirt extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shirt',
      icon: 'shirt',
      ...(data || {})
    })
  }
}

registerClass(Shirt)
