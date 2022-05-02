import Container from './container'
import { registerClass } from '@/utils'

export default class Fridge extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Fridge',
      icon: 'fridge',
      ...data,
    })
  }
}

registerClass(Fridge)
