import Entity from '@/entity'
import { mixin } from '@/utils'
import Openable from '@/mixins/openable'
import Lockable from '@/mixins/lockable'
import Items from '@/mixins/items'

export default class Container extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Container',
      ...data,
    })
  }
}

mixin(Container, [Items, Openable, Lockable])
