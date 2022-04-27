import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Tree extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tree',
      icon: 'tree',
      iconSuffix: random(1, 5),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Tree)
