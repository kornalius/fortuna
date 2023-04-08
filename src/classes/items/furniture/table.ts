import random from 'lodash/random'
import { mixin, registerClass } from '@/utils'
import { Item } from '../item'
import { IItems, Items } from '@/mixins/items'
import { ISearchable, Searchable } from '@/mixins/searchable'
import { SetupData } from '@/entity'

export interface Table extends IItems, ISearchable {}

export class Table extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Table',
      icon: 'table',
      iconSuffix: random(1, 3),
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
