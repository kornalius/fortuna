import Item from './item'
import { registerClass } from '@/utils'

export default class Thumbdrive extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Thumb drive',
      icon: 'thumb-drive',
      usable: true,
      ...data,
    })
  }
}

registerClass(Thumbdrive)
