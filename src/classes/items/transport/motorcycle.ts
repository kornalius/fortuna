import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Motorcycle extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Motorcycle',
      icon: 'motorcycle',
      ...(data || {})
    })
  }
}

registerClass(Motorcycle)
