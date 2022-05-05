import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Socks extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Socks',
      icon: 'socks',
      ...data,
    })
  }
}

registerClass(Socks)
