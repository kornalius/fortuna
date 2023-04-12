import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class Flower extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Flower',
      icon: 'flower',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(Flower)
