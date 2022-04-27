import Food from './food'
import { pickRandom, registerClass } from '@/utils'

export default class Apple extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Apple',
      icon: pickRandom(['apple', 'appleGreen']),
      ...data,
    })
  }
}

registerClass(Apple)
