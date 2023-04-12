import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Painting extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Painting',
      icon: 'painting',
      iconSuffix: random(1, 3).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Painting)
