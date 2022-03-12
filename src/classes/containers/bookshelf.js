import Container from '@/classes/containers/container'
import { books } from '@/generators'
import { registerClass } from '@/utils'

export default class BookShelf extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'BookShelf',
      icon: 'bookshelf',
      openable: false,
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onSearch() {
    await super.onSearch()
    // generate random books
    this.addItem(books())
  }
}

registerClass(BookShelf)
