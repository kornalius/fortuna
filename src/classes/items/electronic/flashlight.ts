import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class Flashlight extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
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
