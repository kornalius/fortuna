import Food from './food'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class Coffee extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Coffee',
      icon: 'coffee',
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('drink')
  }
}

registerClass(Coffee)
