import Item from '../item'
import { registerClass } from '@/utils'

export default class CarBattery extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Car battery',
      icon: 'fa-solid:car-battery',
      ...data,
    })
  }
}

registerClass(CarBattery)
