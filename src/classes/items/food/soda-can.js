import Food from './food'
import { registerClass } from '@/utils'
import { store } from '@/store'

export default class SodaCan extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'SodaCan',
      icon: 'sodaCan',
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('drink')
  }
}

registerClass(SodaCan)
