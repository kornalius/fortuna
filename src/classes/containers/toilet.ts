import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { SetupData } from '@/entity'

export class Toilet extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'Toilet',
      icon: 'toilet',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(Toilet)
