import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Diskette extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Diskette',
      icon: 'diskette',
      ...(data || {})
    })
  }
}

registerClass(Diskette)
