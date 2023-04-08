import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Tomato extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tomato',
      icon: 'tomato',
      ...(data || {})
    })
  }
}

registerClass(Tomato)
