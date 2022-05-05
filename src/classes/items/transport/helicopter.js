import Item from '../item'
import { registerClass } from '@/utils'

export default class Helicopter extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Helicopter',
      icon: 'helicopter',
      ...data,
    })
  }
}

registerClass(Helicopter)
