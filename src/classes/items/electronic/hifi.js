import Item from '../item'
import { registerClass } from '@/utils'

export default class Hifi extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hifi',
      icon: 'hifi',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Hifi)
