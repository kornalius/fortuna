import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Banana extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Banana',
      icon: 'banana',
      ...(data || {})
    })
  }
}

registerClass(Banana)
