import Food from './food'
import { registerClass } from '@/utils'

export default class Sandwich extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sandwich',
      icon: 'sandwich',
      ...data,
    })
  }
}

registerClass(Sandwich)
