import Item from '../item'
import { registerClass } from '@/utils'

export default class Chair extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Chair',
      icon: 'fa-solid:chair',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Chair)
