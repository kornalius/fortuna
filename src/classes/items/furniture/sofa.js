import Item from '../item'
import { registerClass } from '@/utils'

export default class Sofa extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sofa',
      icon: 'sofa',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  get canSleepOn() { return true }
}

registerClass(Sofa)
