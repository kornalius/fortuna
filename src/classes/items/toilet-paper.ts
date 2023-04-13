import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class ToiletPaper extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'ToiletPaper',
      icon: 'toilet-paper',
      weight: 1,
      ...(data || {})
    })
  }
}

registerClass(ToiletPaper)
