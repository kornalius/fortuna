import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from './electronic'
import { SetupData } from '@/entity'

export class Pc extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pc',
      icon: 'pc',
      iconSuffix: random(1, 4).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Pc)
