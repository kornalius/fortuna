import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Hotel extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hotel',
      icon: 'hotel',
      ...data,
    })
  }
}

registerClass(Hotel)
