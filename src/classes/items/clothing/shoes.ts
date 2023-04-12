import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class Shoes extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shoes',
      icon: 'shoes',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(Shoes)
