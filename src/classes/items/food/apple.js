import Food from './food'
import { registerClass } from '@/utils'

export default class Apple extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Apple',
      icon: 'apple',
      ...data,
    })
  }
}

registerClass(Apple)
