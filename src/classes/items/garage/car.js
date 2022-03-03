import Item from '../item'
import { pickRandom, registerClass } from '@/utils'

export default class Car extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Car',
      icon: pickRandom(['fontisto:car', 'maki:car']),
      ...data,
    })
  }
}

registerClass(Car)
