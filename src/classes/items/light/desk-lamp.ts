import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'

export class DeskLamp extends Light {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Desk lamp',
      icon: 'desk-lamp',
      iconSuffix: random(1, 2),
      ...(data || {})
    })
  }
}

registerClass(DeskLamp)
