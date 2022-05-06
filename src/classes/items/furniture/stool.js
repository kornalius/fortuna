import Item from '../item'
import { registerClass } from '@/utils'
import random from 'lodash/random';

export default class Stool extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Stool',
      icon: 'stool',
      iconSuffix: random(1, 5),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Stool)
