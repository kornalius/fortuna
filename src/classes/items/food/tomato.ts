import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Tomato extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tomato',
      icon: 'tomato',
      ...(data || {})
    })
  }
}

registerClass(Tomato)
