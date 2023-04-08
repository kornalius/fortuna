import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Helicopter extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Helicopter',
      icon: 'helicopter',
      ...(data || {})
    })
  }
}

registerClass(Helicopter)
