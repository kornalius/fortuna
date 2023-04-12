import { registerClass } from '@/utils'
import { Container, IContainerData } from '@/classes/containers/container'
import { SetupData } from '@/entity'

export class Kettle extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'Kettle',
      icon: 'kettle',
      ...(data || {})
    })
  }
}

registerClass(Kettle)
