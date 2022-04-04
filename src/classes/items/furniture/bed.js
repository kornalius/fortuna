import Item from '../item'
import { registerClass } from '@/utils'

export default class Bed extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Bed',
      icon: 'bed',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  get canSleepOn() { return true }
}

registerClass(Bed)
