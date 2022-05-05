import Clothes from './clothes'
import { registerClass } from '@/utils'

export default class Underwear extends Clothes {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Underwear',
      icon: 'underwear',
      ...data,
    })
  }
}

registerClass(Underwear)
