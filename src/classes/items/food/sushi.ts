import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Sushi extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sushi',
      icon: 'sushi',
      ...(data || {})
    })
  }
}

registerClass(Sushi)
