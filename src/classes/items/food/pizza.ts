import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Pizza extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pizza',
      icon: 'pizza',
      ...(data || {})
    })
  }
}

registerClass(Pizza)
