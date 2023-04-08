import { registerClass } from '@/utils'
import { Item } from './item'
import { SetupData } from '@/entity'

export class Stairs extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Stairs',
      icon: 'stairs',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(Stairs)
