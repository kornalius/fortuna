import { registerClass } from '@/utils'
import { Clothes, IClothesSetupData } from './clothes'
import { SetupData } from '@/entity'

export class Boots extends Clothes {
  setupInstance(data?: IClothesSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Boots',
      icon: 'boots',
      ...(data || {})
    })
  }
}

registerClass(Boots)
