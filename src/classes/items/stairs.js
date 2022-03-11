import Item from './item'
import { registerClass } from '@/utils'

export default class Stairs extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Stairs',
      icon: 'stairs',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Stairs)
