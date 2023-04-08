import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Flower extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Flower',
      icon: 'flower',
      iconSuffix: random(1, 2),
      ...(data || {})
    })
  }
}

registerClass(Flower)
