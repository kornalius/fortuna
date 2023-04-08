import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Mushroom extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mushroom',
      icon: 'mushroom',
      ...(data || {})
    })
  }
}

registerClass(Mushroom)
