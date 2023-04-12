import { registerClass } from '@/utils'
import { IItemSetupData, Item } from './item'
import { SetupData } from '@/entity'

export class Stairs extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
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
