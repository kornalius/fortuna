import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Pizza extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pizza',
      icon: 'pizza',
      ...(data || {})
    })
  }
}

registerClass(Pizza)
