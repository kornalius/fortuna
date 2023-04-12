import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Brocoli extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Brocoli',
      icon: 'brocoli',
      ...(data || {})
    })
  }
}

registerClass(Brocoli)
