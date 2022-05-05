import Item from '../item'
import { registerClass } from '@/utils'

export default class Taxi extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Taxi',
      icon: 'taxi',
      ...data,
    })
  }
}

registerClass(Taxi)
