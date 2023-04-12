import { registerClass } from '@/utils'
import { IItemSetupData, Item } from './item'
import { SetupData } from '@/entity'

export class Pills extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pills',
      icon: 'pills',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Pills)
