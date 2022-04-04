import Food from './food'
import { registerClass } from '@/utils'

export default class Cheese extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cheese',
      icon: 'cheese',
      ...data,
    })
  }
}

registerClass(Cheese)
