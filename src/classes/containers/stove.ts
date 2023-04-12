import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { SetupData } from '@/entity'

export class Stove extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Stove',
      icon: 'stove',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Stove)
