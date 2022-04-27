import Item from '../item'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Food extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Food',
      consumable: true,
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('eat')
  }
}

registerClass(Food)
