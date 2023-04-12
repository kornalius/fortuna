import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from '@/classes/containers/container'
import { SetupData } from '@/entity'

export class Closet extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Closet',
      icon: 'closet',
      openIconSuffix: true,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Closet)
