import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Steak extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Steak',
      icon: 'steak',
      ...(data || {})
    })
  }
}

registerClass(Steak)
