import { registerClass } from '@/utils'
import { Food, IFoodData } from './food'
import { SetupData } from '@/entity'

export class Orange extends Food {
  setupInstance(data?: IFoodData): SetupData | undefined {
    return super.setupInstance({
      name: 'Orange',
      icon: 'orange',
      ...(data || {})
    })
  }
}

registerClass(Orange)
