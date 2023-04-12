import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from './electronic'
import { SetupData } from '@/entity'

export class Laptop extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Laptop',
      icon: 'laptop',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(Laptop)
