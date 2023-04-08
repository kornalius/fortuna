import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Laptop extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Laptop',
      icon: 'laptop',
      iconSuffix: random(1, 2),
      ...(data || {})
    })
  }
}

registerClass(Laptop)
