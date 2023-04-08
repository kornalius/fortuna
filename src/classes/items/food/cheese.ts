import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Cheese extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cheese',
      icon: 'cheese',
      ...(data || {})
    })
  }
}

registerClass(Cheese)
