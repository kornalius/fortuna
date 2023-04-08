import { mixin, registerClass } from '@/utils'
import { Item } from '../item'
import { IItems } from '@/mixins/items'
import { ISearchable } from '@/mixins/searchable'
import { SetupData } from '@/entity'

export interface RoundTable extends IItems, ISearchable {}

export class RoundTable extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
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
