import Item from '../item'
import { registerClass } from '@/utils'

export default class Pc extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pc',
      icon: 'pc',
      usable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Pc)