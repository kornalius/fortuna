import { registerClass } from '@/utils'
import { Clothes, IClothesSetupData } from './clothes'
import { SetupData } from '@/entity'

export class Jeans extends Clothes {
  setupInstance(data?: IClothesSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Jeans',
      icon: 'jeans',
      ...(data || {})
    })
  }
}

registerClass(Jeans)
