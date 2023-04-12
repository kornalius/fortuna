import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Cucumber extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cucumber',
      icon: 'cucumber',
      ...(data || {})
    })
  }
}

registerClass(Cucumber)
