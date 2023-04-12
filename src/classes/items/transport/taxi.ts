import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Taxi extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Taxi',
      icon: 'taxi',
      ...(data || {})
    })
  }
}

registerClass(Taxi)
