import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Tree extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tree',
      icon: 'tree',
      iconSuffix: random(1, 5).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Tree)
