import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Snickers extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Snickers',
      icon: 'snickers',
      ...(data || {})
    })
  }
}

registerClass(Snickers)
