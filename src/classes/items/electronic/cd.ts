import { registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { SetupData } from '@/entity'

export class CD extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'CD',
      icon: 'cd',
      ...(data || {})
    })
  }
}

registerClass(CD)
