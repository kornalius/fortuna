import random from 'lodash/random'
import Item from '../item'
import { registerClass } from '@/utils'

export default class Painting extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Painting',
      icon: 'painting',
      iconSuffix: random(1, 3),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Painting)
