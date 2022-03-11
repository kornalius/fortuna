import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Store extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Store',
      icon: 'store',
      ...data,
    })
  }
}

registerClass(Store)
