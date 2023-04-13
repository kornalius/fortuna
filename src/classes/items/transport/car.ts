import { registerClass } from '@/utils'
import random from 'lodash/random'
import { SetupData } from '@/entity'
import { Transport, ITransportData } from './transport'

export class Car extends Transport {
  setupInstance(data?: ITransportData): SetupData | undefined {
    return super.setupInstance({
      name: 'Car',
      icon: 'car',
      iconSuffix: random(1, 5).toString(),
      ...(data || {})
    })
  }
}

registerClass(Car)
