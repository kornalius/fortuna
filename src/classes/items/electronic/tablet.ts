import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from './electronic'
import { SetupData } from '@/entity'

export class Tablet extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tablet',
      icon: 'tablet',
      ...(data || {})
    })
  }
}

registerClass(Tablet)
