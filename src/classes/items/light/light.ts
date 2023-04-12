import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from '../electronic/electronic'
import { SetupData } from '@/entity'

export class Light extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Light',
      usable: true,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Light)
