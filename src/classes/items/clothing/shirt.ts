import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Shirt extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shirt',
      icon: 'shirt',
      ...(data || {})
    })
  }
}

registerClass(Shirt)
