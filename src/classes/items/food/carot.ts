import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Carot extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Carot',
      icon: 'carot',
      ...(data || {})
    })
  }
}

registerClass(Carot)
