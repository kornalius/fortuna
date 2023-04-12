import { registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { SetupData } from '@/entity'

export class CarBattery extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Car battery',
      icon: 'carBattery',
      ...(data || {})
    })
  }
}

registerClass(CarBattery)
