import Item from './item'
import { registerClass } from '@/utils'

export default class Smartphone extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'quill:phone',
      usable: true,
      ...data,
    })
  }
}

registerClass(Smartphone)
