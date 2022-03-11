import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class PoliceStation extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Police station',
      icon: 'police-station',
      ...data,
    })
  }
}

registerClass(PoliceStation)
