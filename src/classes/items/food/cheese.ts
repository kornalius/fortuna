import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Cheese extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cheese',
      icon: 'cheese',
      ...(data || {})
    })
  }
}

registerClass(Cheese)
