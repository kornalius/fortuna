import { registerClass } from '@/utils'
import { IItemSetupData, Item } from '../item'
import { SetupData } from '@/entity'

export class GasPump extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Gas pump',
      icon: 'gasPump',
      ...(data || {})
    })
  }
}

registerClass(GasPump)
