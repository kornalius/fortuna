import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class Stairs extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
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
