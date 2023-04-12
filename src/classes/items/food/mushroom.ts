import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Mushroom extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mushroom',
      icon: 'mushroom',
      ...(data || {})
    })
  }
}

registerClass(Mushroom)
