import Electronic from './electronic'
import { registerClass } from '@/utils'
import { store } from '@/store';

export default class CoffeeMaker extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'CoffeeMaker',
      icon: 'coffee-maker',
      ...data,
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      store.game.playSound('coffee-maker')
    }
  }
}

registerClass(CoffeeMaker)
