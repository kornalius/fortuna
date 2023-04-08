import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class CD extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'CD',
      icon: 'cd',
      ...(data || {})
    })
  }
}

registerClass(CD)
