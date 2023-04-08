import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Memcard extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Memory card',
      icon: 'memoryCard',
      ...(data || {})
    })
  }
}

registerClass(Memcard)
