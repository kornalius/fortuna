import Item from './item'
import Searchable from '@/mixins/searchable'
import { mixin, registerClass } from '@/utils'

export default class Books extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Books',
      icon: 'books',
      ...data,
    })
  }
}

mixin(Books, [
  Searchable,
])

registerClass(Books)
