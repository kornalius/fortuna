import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'

export class StreetLamp extends Light {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Street lamp',
      icon: 'street-lamp',
      iconSuffix: random(1, 3),
      ...(data || {})
    })
  }
}

registerClass(StreetLamp)
