import Item from '../item'
import { registerClass } from '@/utils'

export default class Pinetree extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pine tree',
      icon: 'pinetree',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Pinetree)
