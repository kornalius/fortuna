import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Tomato extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tomato',
      icon: 'tomato',
      ...(data || {})
    })
  }
}

registerClass(Tomato)
