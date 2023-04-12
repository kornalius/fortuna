import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Jeans extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Jeans',
      icon: 'jeans',
      ...(data || {})
    })
  }
}

registerClass(Jeans)
