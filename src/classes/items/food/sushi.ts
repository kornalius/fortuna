import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Sushi extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sushi',
      icon: 'sushi',
      ...(data || {})
    })
  }
}

registerClass(Sushi)
