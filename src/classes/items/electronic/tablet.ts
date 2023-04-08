import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class Tablet extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tablet',
      icon: 'tablet',
      ...(data || {})
    })
  }
}

registerClass(Tablet)
