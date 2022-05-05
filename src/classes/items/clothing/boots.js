import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Boots extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Boots',
      icon: 'boots',
      ...data,
    })
  }
}

registerClass(Boots)
