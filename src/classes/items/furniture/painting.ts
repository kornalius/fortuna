import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Painting extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Painting',
      icon: 'painting',
      iconSuffix: random(1, 3),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Painting)
