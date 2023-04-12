import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Banana extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Banana',
      icon: 'banana',
      ...(data || {})
    })
  }
}

registerClass(Banana)
