import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Car extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Car',
      icon: 'car',
      iconSuffix: random(1, 5),
      ...data,
    })
  }
}

registerClass(Car)
