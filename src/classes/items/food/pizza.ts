import { registerClass } from '@/utils'
import { Food } from './food'
import { SetupData } from '@/entity'

export class Pizza extends Food {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pizza',
      icon: 'pizza',
      ...(data || {})
    })
  }
}

registerClass(Pizza)
