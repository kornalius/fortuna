import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class RoadBlock extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Roadblock',
      icon: 'road-block',
      iconSuffix: random(1, 2),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(RoadBlock)
