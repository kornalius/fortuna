import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Shirt extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Shirt',
      icon: 'shirt',
      ...data,
    })
  }
}

registerClass(Shirt)
