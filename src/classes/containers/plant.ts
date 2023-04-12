import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Plant extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
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
