import random from 'lodash/random'
import Light from './light'
import { registerClass } from '@/utils'

export default class StreetLamp extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Street lamp',
      icon: 'street-lamp',
      iconSuffix: random(1, 3),
      ...data,
    })
  }
}

registerClass(StreetLamp)
