import { registerClass } from '@/utils'
import random from 'lodash/random'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class Car extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Car',
      icon: 'car',
      iconSuffix: random(1, 5).toString(),
      ...(data || {})
    })
  }
}

registerClass(Car)
