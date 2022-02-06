import Entity from '@/entity'
import { mixin } from '@/utils'
import Items from '@/mixins/items'

export default class Table extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Table',
      ...data,
    })
  }
}

mixin(Table, [Items])
