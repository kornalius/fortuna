import { registerClass } from '@/utils'
import { Clothes, IClothesSetupData } from './clothes'
import { SetupData } from '@/entity'

export class Snickers extends Clothes {
  setupInstance(data?: IClothesSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Snickers',
      icon: 'snickers',
      ...(data || {})
    })
  }
}

registerClass(Snickers)
