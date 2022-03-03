import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Hotel extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hotel',
      icon: 'fa6-solid:hotel',
      ...data,
    })
  }
}

registerClass(Hotel)
