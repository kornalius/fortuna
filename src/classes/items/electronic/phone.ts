import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'
import { IElectronicSetupData } from '@/classes/items/electronic/electronic'

export class Phone extends Item {
  setupInstance(data?: IElectronicSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Phone',
      icon: 'phone',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Phone)
