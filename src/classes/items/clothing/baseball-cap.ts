import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class BaseballCap extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Baseball cap',
      icon: 'baseball-cap',
      iconSuffix: random(1, 3),
      ...(data || {})
    })
  }
}

registerClass(BaseballCap)
