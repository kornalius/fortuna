import Food from './food'
import { registerClass } from '@/utils'

export default class Milk extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Milk',
      icon: 'milk',
      ...data,
    })
  }
}

registerClass(Milk)
