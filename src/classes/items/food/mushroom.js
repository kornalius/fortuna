import Food from './food'
import { registerClass } from '@/utils'

export default class Mushroom extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Mushroom',
      icon: 'mushroom',
      ...data,
    })
  }
}

registerClass(Mushroom)
