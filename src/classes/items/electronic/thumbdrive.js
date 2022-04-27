import Item from '../item'
import { registerClass } from '@/utils'

export default class Thumbdrive extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Thumb drive',
      icon: 'thumbDrive',
      ...data,
    })
  }
}

registerClass(Thumbdrive)
