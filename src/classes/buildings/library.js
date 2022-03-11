import Building from '@/classes/buildings/building'
import { registerClass } from '@/utils'

export default class Library extends Building {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Library',
      icon: 'library',
      ...data,
    })
  }
}

registerClass(Library)
