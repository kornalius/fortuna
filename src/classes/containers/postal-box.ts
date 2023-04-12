import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { SetupData } from '@/entity'

export class PostalBox extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
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
