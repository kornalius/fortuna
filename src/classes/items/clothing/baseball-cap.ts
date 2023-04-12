import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Clothes, IClothesData } from './clothes'
import { SetupData } from '@/entity'

export class BaseballCap extends Clothes {
  setupInstance(data?: IClothesData): SetupData | undefined {
    return super.setupInstance({
      name: 'Baseball cap',
      icon: 'baseball-cap',
      iconSuffix: random(1, 3).toString(),
      ...(data || {})
    })
  }
}

registerClass(BaseballCap)
