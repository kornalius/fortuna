import { registerClass } from '@/utils'
import { Electronic, IElectronicData } from './electronic'
import { SetupData } from '@/entity'

export class Smartphone extends Electronic {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'smartphone',
      ...(data || {})
    })
  }
}

registerClass(Smartphone)
