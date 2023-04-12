import { registerClass } from '@/utils'
import { IItemData, Item } from './item'
import { SetupData } from '@/entity'

export class Book extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Book',
      icon: 'book',
      weight: 1,
      ...(data || {})
    })
  }
}

registerClass(Book)
