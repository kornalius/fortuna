import Item from './item'
import { registerClass } from '@/utils'

export default class Book extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Book',
      icon: 'book',
      weight: 1,
      usable: true,
      ...data,
    })
  }
}

registerClass(Book)
