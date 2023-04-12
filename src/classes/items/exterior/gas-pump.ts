import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class GasPump extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Gas pump',
      icon: 'gasPump',
      ...(data || {})
    })
  }
}

registerClass(GasPump)
