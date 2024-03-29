import Food from './food'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Milk extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Milk',
      icon: 'milk',
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('drink')
  }
}

registerClass(Milk)
