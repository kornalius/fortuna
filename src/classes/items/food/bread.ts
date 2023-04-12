import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Bread extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bread',
      icon: 'bread',
      ...(data || {})
    })
  }
}

registerClass(Bread)
