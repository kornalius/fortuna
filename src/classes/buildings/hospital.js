import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Hospital extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hospital',
      icon: 'hospital',
      ...data,
    })
  }
}

registerClass(Hospital)
