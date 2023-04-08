import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Stool extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Stool',
      icon: 'stool',
      iconSuffix: random(1, 5),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Stool)
