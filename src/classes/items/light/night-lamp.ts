import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemSetupData } from '@/classes/items/item'

export class NightLamp extends Light {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Night lamp',
      icon: 'night-lamp',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(NightLamp)
