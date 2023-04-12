import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Watermelon extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Watermelon',
      icon: 'watermelon',
      ...(data || {})
    })
  }
}

registerClass(Watermelon)
