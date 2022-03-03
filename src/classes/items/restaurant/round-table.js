import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Items from '@/mixins/items'

export default class RoundTable extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Round table',
      icon: 'ic:sharp-table-bar',
      searchable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(RoundTable, [
  Items,
])

registerClass(RoundTable)
