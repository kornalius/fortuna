import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Jeans extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Jeans',
      icon: 'jeans',
      ...data,
    })
  }
}

registerClass(Jeans)
