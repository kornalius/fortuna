import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item, IItemSetupData } from '../item'
import { SetupData } from '@/entity'

export class Stool extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Stool',
      icon: 'stool',
      iconSuffix: random(1, 5).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Stool)
