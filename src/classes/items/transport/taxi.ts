import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class Taxi extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Taxi',
      icon: 'taxi',
      ...(data || {})
    })
  }
}

registerClass(Taxi)
