import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Croissant extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Croissant',
      icon: 'croissant',
      ...(data || {})
    })
  }
}

registerClass(Croissant)
