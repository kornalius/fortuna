import Entity from '@/entity'
import { mixin } from '@/utils'
import { store } from '@/store'
import Name from '@/mixins/name'
import Description from '@/mixins/description'
import Icon from '@/mixins/icon'
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

export default class Item extends Entity {
  setupInstance(data) {
    const { locationId, locationStore } = this.setupLocation(data)

    return {
      name: 'Item',
      description: 'An item',
      qty: 1,
      weight: 0,
      locationId,
      locationStore,
      ...data,
    }
  }

  get stackable() { return false }

  get weight() { return this.state.weight }
  set weight(value) { this.state.weight = value }

  get qty() { return this.state.qty }
  set qty(value) { this.state.qty = this.stackable ? Math.max(0, value) : 1 }

  get isInInventory() { return store.player.has(this) }
}

mixin(Item, [
  Name,
  Description,
  Operation,
  Hovered,
  Icon,
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
])
