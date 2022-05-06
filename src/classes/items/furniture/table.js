import random from 'lodash/random'
import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Items from '@/mixins/items'
import Searchable from '@/mixins/searchable'

export default class Table extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Table',
      icon: 'table',
      iconSuffix: random(1, 3),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(Table, [
  Items,
  Searchable,
])

registerClass(Table)
