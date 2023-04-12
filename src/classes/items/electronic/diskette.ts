import { registerClass } from '@/utils'
import { Item, IItemSetupData } from '../item'
import { SetupData } from '@/entity'

export class Diskette extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Diskette',
      icon: 'diskette',
      ...(data || {})
    })
  }
}

registerClass(Diskette)
