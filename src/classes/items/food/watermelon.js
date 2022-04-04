import Food from './food'
import { registerClass } from '@/utils'

export default class Watermelon extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Watermelon',
      icon: 'watermelon',
      ...data,
    })
  }
}

registerClass(Watermelon)
