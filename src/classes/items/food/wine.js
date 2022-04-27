import Food from './food'
import { registerClass } from '@/utils'
import { store } from '@/store';

export default class Wine extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Wine',
      icon: 'wine',
      ...data,
    })
  }

  async onUse() {
    store.game.playSound('drink')
  }
}

registerClass(Wine)
