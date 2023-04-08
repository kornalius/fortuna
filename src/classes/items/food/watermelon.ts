import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Watermelon extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Watermelon',
      icon: 'watermelon',
      ...(data || {})
    })
  }
}

registerClass(Watermelon)
