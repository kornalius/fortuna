import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Taxi extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Taxi',
      icon: 'taxi',
      ...(data || {})
    })
  }
}

registerClass(Taxi)
