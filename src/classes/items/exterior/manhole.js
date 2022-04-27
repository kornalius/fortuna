import Item from '../item'
import { registerClass } from '@/utils'

export default class Manhole extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Manhole',
      icon: 'tree',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Manhole)
