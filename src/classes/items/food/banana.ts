import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Banana extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Banana',
      icon: 'banana',
      ...(data || {})
    })
  }
}

registerClass(Banana)
