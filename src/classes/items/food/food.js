import Item from '../item'
import { registerClass } from '@/utils'

export default class Food extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Food',
      consumable: true,
      ...data,
    })
  }
}

registerClass(Food)
