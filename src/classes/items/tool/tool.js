import Item from '../item'
import { registerClass } from '@/utils'

export default class Tool extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tool',
      usable: true,
      ...data,
    })
  }
}

registerClass(Tool)
