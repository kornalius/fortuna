import Item from '../item'
import { registerClass } from '@/utils'

export default class Stool extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Stool',
      icon: 'stool',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Stool)
