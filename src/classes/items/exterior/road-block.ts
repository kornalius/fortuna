import random from 'lodash/random'
import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class RoadBlock extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
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
