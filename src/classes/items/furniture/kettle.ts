import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from '@/classes/containers/container'
import { SetupData } from '@/entity'

export class Kettle extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Kettle',
      icon: 'kettle',
      ...(data || {})
    })
  }
}

registerClass(Kettle)
