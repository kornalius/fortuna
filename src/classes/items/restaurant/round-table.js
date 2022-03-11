import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Items from '@/mixins/items'
import Searchable from '@/mixins/searchable'

export default class RoundTable extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Round table',
      icon: 'ic:sharp-table-bar',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(RoundTable, [
  Items,
  Searchable,
])

registerClass(RoundTable)
