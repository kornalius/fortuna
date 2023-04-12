import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Mushroom extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mushroom',
      icon: 'mushroom',
      ...(data || {})
    })
  }
}

registerClass(Mushroom)
