import Container from '@/classes/containers/container'
import { generateLoot } from '@/generators'
import { books } from '@/items-groups'
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
    this.addItem(generateLoot(books))
  }
}

registerClass(BookShelf)
