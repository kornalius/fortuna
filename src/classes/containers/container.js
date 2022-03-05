import Entity from '@/entity'
import { mixin, registerClass } from '@/utils'
import Code from '@/mixins/code'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Icon from '@/mixins/icon'
import Hovered from '@/mixins/hovered'
import Location from '@/mixins/location'
import Actions from '@/mixins/actions'
import Examinable from '@/mixins/examinable'
import Openable from '@/mixins/openable'
import Searchable from '@/mixins/searchable'
import Unlockable from '@/mixins/unlockable'
import Pushable from '@/mixins/pushable'
import Pullable from '@/mixins/pullable'
import Items from '@/mixins/items'
import Requirements from '@/mixins/requirements'
import { store } from '@/store'

export default class Container extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Container',
      locationId,
      locationStore,
      searchable: true,
      ...data,
    })
  }

  get isInInventory() { return store.player.has(this) }
}

mixin(Container, [
  Code,
  Name,
  Description,
  Icon,
  Hovered,
  Location,
  Actions,
  Examinable,
  Openable,
  Searchable,
  Unlockable,
  Pushable,
  Pullable,
  Items,
  Requirements,
])

registerClass(Container)
