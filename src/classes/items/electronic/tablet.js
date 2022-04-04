import Item from '../item'
import { registerClass } from '@/utils'

export default class Tablet extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tablet',
      icon: 'tablet',
      usable: true,
      ...data,
    })
  }
}

registerClass(Tablet)
