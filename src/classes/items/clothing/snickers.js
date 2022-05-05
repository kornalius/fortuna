import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Snickers extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Snickers',
      icon: 'snickers',
      ...data,
    })
  }
}

registerClass(Snickers)
