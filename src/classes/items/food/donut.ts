import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Donut extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Donut',
      icon: 'donut',
      ...(data || {})
    })
  }
}

registerClass(Donut)
