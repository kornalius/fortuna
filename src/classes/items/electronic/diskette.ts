import { registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { SetupData } from '@/entity'

export class Diskette extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Diskette',
      icon: 'diskette',
      ...(data || {})
    })
  }
}

registerClass(Diskette)
