import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class CoffeeMaker extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'CoffeeMaker',
      icon: 'coffee-maker',
      ...(data || {})
    })
  }

  async onUse() {
    await this.toggle()
    if (this.isOn) {
      window.store.game.playSound('coffee-maker')
    }
  }
}

registerClass(CoffeeMaker)
