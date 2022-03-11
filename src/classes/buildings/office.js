import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Office extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Office',
      icon: 'office',
      ...data,
    })
  }
}

registerClass(Office)
