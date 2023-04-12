import { registerClass } from '@/utils'
import { Electronic, IElectronicSetupData } from './electronic'
import { SetupData } from '@/entity'

export class Tv extends Electronic {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tv',
      icon: 'tv',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Tv)
