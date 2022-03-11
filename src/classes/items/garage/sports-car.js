import Item from '../item'
import { registerClass } from '@/utils'

export default class Sportscar extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sports car',
      icon: 'sports-car',
      ...data,
    })
  }
}

registerClass(Sportscar)
