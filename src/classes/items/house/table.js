import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Items from '@/mixins/items'

export default class Table extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Table',
      icon: 'ic:baseline-table-restaurant',
      searchable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(Table, [
  Items,
])

registerClass(Table)
