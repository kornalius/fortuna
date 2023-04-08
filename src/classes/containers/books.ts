import { mixin, registerClass } from '@/utils'
import { ISearchable } from '@/mixins/searchable'
import { Container } from './container'
import { books } from '@/generators'
import { SetupData } from '@/entity'

export interface Books extends ISearchable {}

export class Books extends Container {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Books',
      icon: 'books',
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
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
