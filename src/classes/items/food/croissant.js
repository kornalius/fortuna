import Food from './food'
import { registerClass } from '@/utils'

export default class Croissant extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Croissant',
      icon: 'croissant',
      ...data,
    })
  }
}

registerClass(Croissant)
