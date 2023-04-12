import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Helicopter extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Helicopter',
      icon: 'helicopter',
      ...(data || {})
    })
  }
}

registerClass(Helicopter)
