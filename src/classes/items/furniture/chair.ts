import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Chair extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Chair',
      icon: 'chair',
      iconSuffix: random(1, 5),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Chair)
