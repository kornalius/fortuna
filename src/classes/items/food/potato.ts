import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Potato extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Potato',
      icon: 'potato',
      ...(data || {})
    })
  }
}

registerClass(Potato)
