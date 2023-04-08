import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'

export class NightLamp extends Light {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Night lamp',
      icon: 'night-lamp',
      iconSuffix: random(1, 2),
      ...(data || {})
    })
  }
}

registerClass(NightLamp)
