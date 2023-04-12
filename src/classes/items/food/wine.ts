import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Wine extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Wine',
      icon: 'wine',
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    window.store.game.playSound('drink')
  }
}

registerClass(Wine)
