import Food from './food'
import { registerClass } from '@/utils'

export default class Bread extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Bread',
      icon: 'bread',
      ...data,
    })
  }
}

registerClass(Bread)
