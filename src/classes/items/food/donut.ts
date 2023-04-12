import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Donut extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Donut',
      icon: 'donut',
      ...(data || {})
    })
  }
}

registerClass(Donut)
