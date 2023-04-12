import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Cabinet extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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
