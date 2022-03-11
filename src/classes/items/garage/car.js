import Item from '../item'
import { pickRandom, registerClass } from '@/utils'

export default class Car extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Car',
      icon: pickRandom(['car1', 'car2']),
      ...data,
    })
  }
}

registerClass(Car)
