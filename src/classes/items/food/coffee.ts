import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Coffee extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Coffee',
      icon: 'coffee',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('drink')
  }
}

registerClass(Coffee)
