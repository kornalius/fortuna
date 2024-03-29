import Item from '../item'
import { registerClass } from '@/utils'

export default class Phone extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Phone',
      icon: 'phone',
      usable: true,
      ...data,
    })
  }
}

registerClass(Phone)
