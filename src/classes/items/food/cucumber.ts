import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Cucumber extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cucumber',
      icon: 'cucumber',
      ...(data || {})
    })
  }
}

registerClass(Cucumber)
