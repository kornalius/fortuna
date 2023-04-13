import { registerClass } from '@/utils'
import { SetupData } from '@/entity'
import { Transport, ITransportData } from './transport'

export class Taxi extends Transport {
  setupInstance(data?: ITransportData): SetupData | undefined {
    return super.setupInstance({
      name: 'Taxi',
      icon: 'taxi',
      ...(data || {})
    })
  }
}

registerClass(Taxi)
