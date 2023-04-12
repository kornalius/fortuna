import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Mirror extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mirror',
      icon: 'mirror',
      iconSuffix: random(1, 2).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Mirror)
