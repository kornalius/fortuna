import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class Motorcycle extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Motorcycle',
      icon: 'motorcycle',
      ...(data || {})
    })
  }
}

registerClass(Motorcycle)
