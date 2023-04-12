import { registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { SetupData } from '@/entity'

export class Memcard extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Memory card',
      icon: 'memoryCard',
      ...(data || {})
    })
  }
}

registerClass(Memcard)
