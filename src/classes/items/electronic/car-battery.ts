import { registerClass } from '@/utils'
import { Item, IItemSetupData } from '../item'
import { SetupData } from '@/entity'

export class CarBattery extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Car battery',
      icon: 'carBattery',
      ...(data || {})
    })
  }
}

registerClass(CarBattery)
