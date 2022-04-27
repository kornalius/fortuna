import Food from './food'
import { registerClass } from '@/utils'

export default class Tomato extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tomato',
      icon: 'tomato',
      ...data,
    })
  }
}

registerClass(Tomato)
