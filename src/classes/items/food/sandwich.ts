import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Sandwich extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sandwich',
      icon: 'sandwich',
      ...(data || {})
    })
  }
}

registerClass(Sandwich)
