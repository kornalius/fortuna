import random from 'lodash/random'
import Light from './light'
import { registerClass } from '@/utils'

export default class NightLamp extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Night lamp',
      icon: 'night-lamp',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

registerClass(NightLamp)
