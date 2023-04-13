import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class ToiletPaperWall extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'ToiletPaperWall',
      icon: 'toilet-paper-wall',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

registerClass(ToiletPaperWall)
