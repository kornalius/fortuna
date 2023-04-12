import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Steak extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Steak',
      icon: 'steak',
      ...(data || {})
    })
  }
}

registerClass(Steak)
