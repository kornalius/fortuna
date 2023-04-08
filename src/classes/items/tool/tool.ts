import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Tool extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Tool',
      usable: true,
      ...(data || {})
    })
  }
}

registerClass(Tool)
