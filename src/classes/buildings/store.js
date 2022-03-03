import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Store extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Store',
      icon: 'fluent:building-retail-20-filled',
      ...data,
    })
  }
}

registerClass(Store)
