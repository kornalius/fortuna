import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Printer extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Printer',
      icon: 'printer',
      usable: true,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Printer)
