import random from 'lodash/random'
import { mixin, registerClass } from '@/utils'
import { Item, IItemSetupData } from '../item'
import { IItems, Items } from '@/mixins/items'
import { ISearchable, ISearchableSetupData, Searchable } from '@/mixins/searchable'
import { SetupData } from '@/entity'

export interface ITableSetupData extends IItemSetupData, ISearchableSetupData {}

export interface Table extends IItems, ISearchable {}

export class Table extends Item {
  constructor(data?: ITableSetupData) {
    super(data)
  }

  setupInstance(data?: ITableSetupData): SetupData | undefined {
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
