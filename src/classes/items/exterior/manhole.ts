import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Manhole extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Manhole',
      icon: 'tree',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Manhole)
