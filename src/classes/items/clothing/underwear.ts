import { registerClass } from '@/utils'
import { Clothes, IClothesSetupData } from './clothes'
import { SetupData } from '@/entity'

export class Underwear extends Clothes {
  setupInstance(data?: IClothesSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Underwear',
      icon: 'underwear',
      ...(data || {})
    })
  }
}

registerClass(Underwear)
