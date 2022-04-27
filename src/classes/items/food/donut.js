import Food from './food'
import { registerClass } from '@/utils'

export default class Donut extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Donut',
      icon: 'donut',
      ...data,
    })
  }
}

registerClass(Donut)
