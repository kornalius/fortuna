import { registerClass } from '@/utils'
import { Food, IFoodSetupData } from './food'
import { SetupData } from '@/entity'

export class Croissant extends Food {
  setupInstance(data?: IFoodSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Croissant',
      icon: 'croissant',
      ...(data || {})
    })
  }
}

registerClass(Croissant)
