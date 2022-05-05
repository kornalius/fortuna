import random from 'lodash/random'
import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Shoes extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Shoes',
      icon: 'shoes',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

registerClass(Shoes)
