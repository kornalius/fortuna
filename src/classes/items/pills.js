import Item from './item'
import { registerClass } from '@/utils'

export default class Pills extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pills',
      icon: 'fa-solid:tablets',
      usable: true,
      ...data,
    })
  }
}

registerClass(Pills)
