import Item from './item'
import { registerClass } from '@/utils'

export default class Book extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Book',
      icon: 'book',
      usable: true,
      ...data,
    })
  }
}

registerClass(Book)
