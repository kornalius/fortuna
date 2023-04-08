import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Pc extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pc',
      icon: 'pc',
      iconSuffix: random(1, 4),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Pc)
