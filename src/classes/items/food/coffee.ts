import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Coffee extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
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
