import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Potato extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Potato',
      icon: 'potato',
      ...(data || {})
    })
  }
}

registerClass(Potato)
