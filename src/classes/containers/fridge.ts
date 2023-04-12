import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Fridge extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'Fridge',
      icon: 'fridge',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Fridge)
