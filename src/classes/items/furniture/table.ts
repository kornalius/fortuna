import random from 'lodash/random'
import { mixin, registerClass } from '@/utils'
import { Item, IItemData } from '../item'
import { IItems, Items } from '@/mixins/items'
import { ISearchable, ISearchableData, Searchable } from '@/mixins/searchable'
import { SetupData } from '@/entity'

export interface ITableData extends IItemData, ISearchableData {}

export interface Table extends IItems, ISearchable {}

export class Table extends Item {
  constructor(data?: ITableData) {
    super(data)
  }

  setupInstance(data?: ITableData): SetupData | undefined {
    return super.setupInstance({
      name: 'Table',
      icon: 'table',
      iconSuffix: random(1, 3).toString(),
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }
}

mixin(Table, [
  Items,
  Searchable,
])

registerClass(Table)
