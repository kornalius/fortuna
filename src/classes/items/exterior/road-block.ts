import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class RoadBlock extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Roadblock',
      icon: 'road-block',
      iconSuffix: random(1, 2),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(RoadBlock)
