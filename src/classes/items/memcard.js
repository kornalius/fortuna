import Item from './item'
import { registerClass } from '@/utils'

export default class Memcard extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Memory card',
      icon: 'memory-card',
      usable: true,
      ...data,
    })
  }
}

registerClass(Memcard)
