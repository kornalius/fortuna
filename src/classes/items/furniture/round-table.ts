import { mixin, registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { IItems, Items } from '@/mixins/items'
import { ISearchable, Searchable } from '@/mixins/searchable'
import { SetupData } from '@/entity'

export interface RoundTable extends IItems, ISearchable {}

export class RoundTable extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Round table',
      icon: 'ic:sharp-table-bar',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

mixin(RoundTable, [
  Items,
  Searchable,
])

registerClass(RoundTable)
