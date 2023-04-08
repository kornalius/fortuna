import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Milk extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Milk',
      icon: 'milk',
      ...(data || {})
    })
  }

  async onUse() {
    window.store.game.playSound('drink')
  }
}

registerClass(Milk)
