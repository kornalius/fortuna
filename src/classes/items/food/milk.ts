import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Milk extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Milk',
      icon: 'milk',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('drink')
  }
}

registerClass(Milk)
