import Item from './item'
import { registerClass } from '@/utils'

export default class Laptop extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Laptop',
      icon: 'entypo:laptop',
      usable: true,
      ...data,
    })
  }
}

registerClass(Laptop)
