import { registerClass } from '@/utils'
import { Item, IItemSetupData } from '../item'
import { SetupData } from '@/entity'

export class Memcard extends Item {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Memory card',
      icon: 'memoryCard',
      ...(data || {})
    })
  }
}

registerClass(Memcard)
