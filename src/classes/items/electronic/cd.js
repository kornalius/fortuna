import Item from '../item'
import { registerClass } from '@/utils'

export default class CD extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'CD',
      icon: 'cd',
      ...data,
    })
  }
}

registerClass(CD)
