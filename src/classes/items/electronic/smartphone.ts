import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class Smartphone extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'smartphone',
      ...(data || {})
    })
  }
}

registerClass(Smartphone)
