import Item from '../item'
import { registerClass } from '@/utils'

export default class Diskette extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Diskette',
      icon: 'diskette',
      ...data,
    })
  }
}

registerClass(Diskette)
