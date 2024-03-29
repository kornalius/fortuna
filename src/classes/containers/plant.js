import random from 'lodash/random'
import Container from './container'
import { registerClass } from '@/utils'

export default class Plant extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Plant',
      icon: 'plant',
      iconSuffix: random(1, 7),
      openable: false,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Plant)
