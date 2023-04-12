import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemData } from '@/classes/items/item'

export class StreetLamp extends Light {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Street lamp',
      icon: 'street-lamp',
      iconSuffix: random(1, 3).toString(),
      ...(data || {})
    })
  }
}

registerClass(StreetLamp)
