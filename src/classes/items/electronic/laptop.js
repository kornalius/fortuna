import random from 'lodash/random'
import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class Laptop extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Laptop',
      icon: 'laptop',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

registerClass(Laptop)
