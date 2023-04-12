import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Underwear extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Underwear',
      icon: 'underwear',
      ...(data || {})
    })
  }
}

registerClass(Underwear)
