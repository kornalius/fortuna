import Entity from '@/entity'
import { mixin, registerClass } from '@/utils'
import Openable from '@/mixins/openable'
import Unlockable from '@/mixins/unlockable'
import Items from '@/mixins/items'

export default class Container extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Container',
      ...data,
    })
  }
}

mixin(Container, [
  Items,
  Openable,
  Unlockable,
])

registerClass(Container)
