import Entity from '@/entity'
import { mixin, registerClass } from '@/utils'
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
      // buffs to apply to an player or npc stats { name, value, time, turns, rolls }
      buffs: [],
      ...data,
    }
  }

  get stackable() { return false }

  get weight() { return this.state.weight }
  set weight(value) { this.state.weight = value }

  get qty() { return this.state.qty }
  set qty(value) { this.state.qty = this.stackable ? Math.max(0, value) : 1 }

  get isInInventory() { return store.player.has(this) }

  get buffs() { return this.state.buffs }
  set buffs(value) { this.state.buffs = value }
  get hasBuffs() { return this.buffs.length > 0 }

  hasBuffsFor(name) {
    return this.buffsFor(name).length > 0
  }

  buffsFor(name) {
    return this.buffs.filter(b => b.name === name)
  }

  sumOfBuffs(name) {
    return this.buffsFor(name).reduce((acc, b) => acc + b.value, 0)
  }

  applyBuffsTo(o) {
    if (typeof o.addBuff !== 'function') {
      return false
    }
    this.buffs.forEach(b => {
      o.addBuff(b.name, b.value, b.time)
    })
    return true
  }
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

registerClass(Item)
