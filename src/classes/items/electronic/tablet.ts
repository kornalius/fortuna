import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class Tablet extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tablet',
      icon: 'tablet',
      ...(data || {})
    })
  }
}

registerClass(Tablet)
