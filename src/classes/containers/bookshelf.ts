import { registerClass } from '@/utils'
import { Container, IContainerData } from './container'
import { books } from '@/generators'
import { SetupData } from '@/entity'

export class BookShelf extends Container {
  setupInstance(data?: IContainerData): SetupData | undefined {
    return super.setupInstance({
      name: 'BookShelf',
      icon: 'bookshelf',
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

registerClass(BookShelf)
