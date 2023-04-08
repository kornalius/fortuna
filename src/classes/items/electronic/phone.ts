import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Phone extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Phone',
      icon: 'phone',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Phone)
