import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'
import { IElectronicData } from '@/classes/items/electronic/electronic'

export class Phone extends Item {
  setupInstance(data?: IElectronicData): SetupData | undefined {
    return super.setupInstance({
      name: 'Phone',
      icon: 'phone',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Phone)
