import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class Helicopter extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Helicopter',
      icon: 'helicopter',
      ...(data || {})
    })
  }
}

registerClass(Helicopter)
