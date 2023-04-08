import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Clothes } from './clothes'
import { SetupData } from '@/entity'

export class Shoes extends Clothes {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Shoes',
      icon: 'shoes',
      iconSuffix: random(1, 2),
      ...(data || {})
    })
  }
}

registerClass(Shoes)
