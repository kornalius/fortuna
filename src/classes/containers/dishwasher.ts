import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Dishwasher extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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
