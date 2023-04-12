import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Motorcycle extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Motorcycle',
      icon: 'motorcycle',
      ...(data || {})
    })
  }
}

registerClass(Motorcycle)
