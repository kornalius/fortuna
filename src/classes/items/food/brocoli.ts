import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Brocoli extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Brocoli',
      icon: 'brocoli',
      ...(data || {})
    })
  }
}

registerClass(Brocoli)
