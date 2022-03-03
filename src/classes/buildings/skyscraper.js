import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Skyscraper extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Skyscraper',
      icon: 'la:building-solid',
      ...data,
    })
  }
}

registerClass(Skyscraper)
