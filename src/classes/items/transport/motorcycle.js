import Item from '../item'
import { registerClass } from '@/utils'

export default class Motorcycle extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Motorcycle',
      icon: 'motorcycle',
      ...data,
    })
  }
}

registerClass(Motorcycle)
