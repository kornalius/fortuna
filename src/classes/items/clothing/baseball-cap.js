import random from 'lodash/random'
import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class BaseballCap extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Baseball cap',
      icon: 'baseball-cap',
      iconSuffix: random(1, 3),
      ...data,
    })
  }
}

registerClass(BaseballCap)
