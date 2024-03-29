import random from 'lodash/random'
import Light from './light'
import { registerClass } from '@/utils'

export default class DeskLamp extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Desk lamp',
      icon: 'desk-lamp',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

registerClass(DeskLamp)
