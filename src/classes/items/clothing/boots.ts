import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Boots extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Boots',
      icon: 'boots',
      ...(data || {})
    })
  }
}

registerClass(Boots)
