import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { SetupData } from '@/entity'

export class Cabinet extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'cabinet',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Cabinet)
