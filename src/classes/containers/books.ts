import { mixin, registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { books } from '@/generators'
import { ISearchable, Searchable } from '@/mixins/searchable'
import { SetupData } from '@/entity'

export interface Books extends ISearchable {}

export class Books extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'Books',
      icon: 'books',
      openable: false,
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  async onUse(): Promise<void> {
    await super.onSearch()
    // generate random books
    this.addItem(books())
  }
}

mixin(Books, [
  Searchable,
])

registerClass(Books)
