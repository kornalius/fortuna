import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Orange extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Orange',
      icon: 'orange',
      ...(data || {})
    })
  }
}

registerClass(Orange)
