import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from './electronic'
import { SetupData } from '@/entity'

export class Flashlight extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Flashlight',
      icon: 'flashlight',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Flashlight)
