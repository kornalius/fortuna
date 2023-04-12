import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Sandwich extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sandwich',
      icon: 'sandwich',
      ...(data || {})
    })
  }
}

registerClass(Sandwich)
