import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Battery extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Battery',
      icon: 'battery',
      ...(data || {})
    })
  }
}

registerClass(Battery)
