import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Croissant extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Croissant',
      icon: 'croissant',
      ...(data || {})
    })
  }
}

registerClass(Croissant)
