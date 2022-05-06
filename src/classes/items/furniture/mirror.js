import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Mirror extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Mirror',
      icon: 'mirror',
      iconSuffix: random(1, 2),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Mirror)
