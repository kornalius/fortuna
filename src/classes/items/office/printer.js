import Item from '../item'
import { registerClass } from '@/utils'

export default class Printer extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Printer',
      icon: 'printer',
      usable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Printer)
