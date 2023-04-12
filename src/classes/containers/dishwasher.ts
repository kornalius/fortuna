import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { SetupData } from '@/entity'

export class Dishwasher extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
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
