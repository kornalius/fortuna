import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Container } from './container'
import { SetupData } from '@/entity'

export class Plant extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Plant',
      icon: 'plant',
      iconSuffix: random(1, 7),
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Plant)
