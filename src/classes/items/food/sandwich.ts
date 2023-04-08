import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Sandwich extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sandwich',
      icon: 'sandwich',
      ...(data || {})
    })
  }
}

registerClass(Sandwich)
