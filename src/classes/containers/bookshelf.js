import Item from '../items/item'
import { registerClass } from '@/utils'

export default class BookShelf extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'BookShelf',
      icon: 'bi:bookshelf',
      searchable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(BookShelf)
