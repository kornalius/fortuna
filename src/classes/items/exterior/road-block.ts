import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class RoadBlock extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Roadblock',
      icon: 'road-block',
      iconSuffix: random(1, 2).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(RoadBlock)
