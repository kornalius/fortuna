import Food from './food'
import { registerClass } from '@/utils'

export default class Potato extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Potato',
      icon: 'potato',
      ...data,
    })
  }
}

registerClass(Potato)
