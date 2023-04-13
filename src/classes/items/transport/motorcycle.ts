import { registerClass } from '@/utils'
import { SetupData } from '@/entity'
import { Transport, ITransportData } from './transport'

export class Motorcycle extends Transport {
  setupInstance(data?: ITransportData): SetupData | undefined {
    return super.setupInstance({
      name: 'Motorcycle',
      icon: 'motorcycle',
      ...(data || {})
    })
  }
}

registerClass(Motorcycle)
