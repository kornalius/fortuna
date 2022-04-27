import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Flower extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Flower',
      icon: 'flower',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

registerClass(Flower)
