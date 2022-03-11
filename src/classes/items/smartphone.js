import Item from './item'
import { registerClass } from '@/utils'

export default class Smartphone extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'smartphone',
      usable: true,
      ...data,
    })
  }
}

registerClass(Smartphone)
