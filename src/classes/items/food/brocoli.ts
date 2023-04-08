import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Brocoli extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Brocoli',
      icon: 'brocoli',
      ...(data || {})
    })
  }
}

registerClass(Brocoli)
