import { registerClass } from '@/utils'
import { Item } from './item'
import { SetupData } from '@/entity'

export class Pills extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Pills',
      icon: 'pills',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Pills)
