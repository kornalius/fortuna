import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class Watch extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Watch',
      icon: 'watch',
      weight: 1,
      ...(data || {})
    })
  }
}

registerClass(Watch)
