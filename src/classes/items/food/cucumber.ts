import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Cucumber extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cucumber',
      icon: 'cucumber',
      ...(data || {})
    })
  }
}

registerClass(Cucumber)
