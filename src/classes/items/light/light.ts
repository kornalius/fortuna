import { registerClass } from '@/utils'
import { Electronic } from '../electronic/electronic'
import { SetupData } from '@/entity'

export class Light extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
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
