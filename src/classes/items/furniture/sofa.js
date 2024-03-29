import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Sofa extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sofa',
      icon: 'sofa',
      iconSuffix: random(1, 2),
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  get canSleepOn() { return true }
}

registerClass(Sofa)
