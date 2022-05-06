import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Chair extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Chair',
      icon: 'chair',
      iconSuffix: random(1, 5),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Chair)
