import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Mirror extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mirror',
      icon: 'mirror',
      iconSuffix: random(1, 2),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Mirror)
