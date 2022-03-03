import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Garage extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Garage',
      icon: 'mdi:garage-variant',
      ...data,
    })
  }
}

registerClass(Garage)
