import Item from '../item'
import { registerClass } from '@/utils'

export default class GasPump extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Gas pump',
      icon: 'gasPump',
      ...data,
    })
  }
}

registerClass(GasPump)
