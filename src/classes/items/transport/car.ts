import { registerClass } from '@/utils'
import random from 'lodash/random'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Car extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Car',
      icon: 'car',
      iconSuffix: random(1, 5),
      ...(data || {})
    })
  }
}

registerClass(Car)
