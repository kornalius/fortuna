import Container from './container'
import Searchable from '@/mixins/searchable'
import { mixin, registerClass } from '@/utils'
import { books } from '@/generators'

export default class Books extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Books',
      icon: 'books',
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

mixin(Books, [
  Searchable,
])

registerClass(Books)
