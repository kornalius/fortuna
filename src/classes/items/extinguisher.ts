import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class Extinguisher extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Extinguisher',
      icon: 'extinguisher',
      weight: 3,
      ...(data || {})
    })
  }
}

registerClass(Extinguisher)
