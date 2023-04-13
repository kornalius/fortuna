import { registerClass } from '@/utils'
import { SetupData } from '@/entity'
import { Transport, ITransportData } from './transport'

export class Helicopter extends Transport {
  setupInstance(data?: ITransportData): SetupData | undefined {
    return super.setupInstance({
      name: 'Helicopter',
      icon: 'helicopter',
      ...(data || {})
    })
  }
}

registerClass(Helicopter)
