import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Battery extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Battery',
      icon: 'battery',
      ...(data || {})
    })
  }
}

registerClass(Battery)
