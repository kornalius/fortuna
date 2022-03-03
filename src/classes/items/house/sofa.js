import Item from '../item'
import { registerClass } from '@/utils'

export default class Sofa extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sofa',
      icon: 'mdi:sofa',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Sofa)
