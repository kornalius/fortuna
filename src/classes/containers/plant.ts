import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Container, IContainerSetupData } from './container'
import { SetupData } from '@/entity'

export class Plant extends Container {
  setupInstance(data?: IContainerSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Plant',
      icon: 'plant',
      iconSuffix: random(1, 7).toString(),
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Plant)
