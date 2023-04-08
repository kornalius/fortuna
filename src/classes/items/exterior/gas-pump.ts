import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class GasPump extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Gas pump',
      icon: 'gasPump',
      ...(data || {})
    })
  }
}

registerClass(GasPump)
