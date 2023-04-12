import { registerClass } from '@/utils'
import { Container, IContainerData } from '@/classes/containers/container'
import { SetupData } from '@/entity'

export class Closet extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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
