import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class PostalBox extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'PostalBox',
      icon: 'postal-box',
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(PostalBox)
