import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Bread extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bread',
      icon: 'bread',
      ...(data || {})
    })
  }
}

registerClass(Bread)
