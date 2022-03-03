import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class House extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'House',
      icon: 'emojione-monotone:house',
      ...data,
    })
  }
}

registerClass(House)
