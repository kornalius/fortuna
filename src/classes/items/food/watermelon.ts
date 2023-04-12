import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Watermelon extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Watermelon',
      icon: 'watermelon',
      ...(data || {})
    })
  }
}

registerClass(Watermelon)
