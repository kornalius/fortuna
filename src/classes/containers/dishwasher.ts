import { registerClass } from '@/utils'
import { Container } from './container'
import { SetupData } from '@/entity'

export class Dishwasher extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Dishwasher',
      icon: 'dishwasher',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Dishwasher)
