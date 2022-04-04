import Food from './food'
import { registerClass } from '@/utils'

export default class Banana extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Banana',
      icon: 'banana',
      ...data,
    })
  }
}

registerClass(Banana)
