import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Chair extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Chair',
      icon: 'chair',
      iconSuffix: random(1, 5).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Chair)
