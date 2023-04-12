import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Flower extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Flower',
      icon: 'flower',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(Flower)
