import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { SetupData } from '@/entity'

export class Sofa extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Sofa',
      icon: 'sofa',
      iconSuffix: random(1, 2).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  get canSleepOn(): boolean { return true }
}

registerClass(Sofa)
