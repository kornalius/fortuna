import Item from '../item'
import { registerClass } from '@/utils'

export default class Wrench extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Wrench',
      icon: 'wrench',
      usable: true,
      ...data,
    })
  }
}

registerClass(Wrench)
