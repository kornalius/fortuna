import Item from '../items/item'
import { mixin, registerClass } from '@/utils'
import Items from '@/mixins/items'

export default class Documents extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Documents',
      icon: 'et:documents',
      searchable: true,
      ...data,
    })
  }
}

mixin(Documents, [
  Items,
])

registerClass(Documents)
