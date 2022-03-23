import Entity from '@/entity'
import { mixin, registerClass } from '@/utils'
import { store } from '@/store'
import Code from '@/mixins/code'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Icon from '@/mixins/icon'
import Weight from '@/mixins/weight'
import Buffs from '@/mixins/buffs'
import Qty from '@/mixins/qty'
import Operation from '@/mixins/operation'
import Hovered from '@/mixins/hovered'
import Location from '@/mixins/location'
import Actions from '@/mixins/actions'
import Pickable from '@/mixins/pickable'
import Dropable from '@/mixins/dropable'
import Usable from '@/mixins/usable'
import Activable from '@/mixins/activable'
import Consumable from '@/mixins/consumable'
import Destructable from '@/mixins/destructable'
import Examinable from '@/mixins/examinable'
import Pushable from '@/mixins/pushable'
import Pullable from '@/mixins/pullable'
import Requirements from '@/mixins/requirements'
import Tooltip from '@/mixins/tooltip'

export default class Item extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return {
      name: 'Item',
      locationId,
      locationStore,
      ...data,
    }
  }

  get isInInventory() { return store.player.has(this) }
}

mixin(Item, [
  Code,
  Name,
  Description,
  Icon,
  Qty,
  Weight,
  Buffs,
  Operation,
  Hovered,
  Location,
  Actions,
  Pickable,
  Dropable,
  Usable,
  Activable,
  Consumable,
  Destructable,
  Examinable,
  Pushable,
  Pullable,
  Requirements,
  Tooltip,
])

registerClass(Item)
