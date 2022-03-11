import Item from './item'
import { registerClass } from '@/utils'

export default class Pills extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pills',
      icon: 'pills',
      usable: true,
      ...data,
    })
  }
}

registerClass(Pills)
