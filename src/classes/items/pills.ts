import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class Pills extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pills',
      icon: 'pills',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Pills)
