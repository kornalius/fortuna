import Food from './food'
import { registerClass } from '@/utils'

export default class Pizza extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pizza',
      icon: 'pizza',
      ...data,
    })
  }
}

registerClass(Pizza)
