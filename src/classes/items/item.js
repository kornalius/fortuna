import Entity from '@/entity'
import { emit, log, mixin } from '@/utils'
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
      examinable: true,
      actions: [
        item => (
          item.canExamine()
            ? {
              label: 'Examine',
              key: 'examine',
              icon: 'emojione:eye',
              click: async () => item.examine(),
            }
            : undefined
        ),
      ],
      actionsOrder: [
        'examine',
      ],
      ...data,
    }
  }

  get stackable() { return false }

  get isExaminable() { return this.state.examinable }
  set examinable(value) { this.state.examinable = value }

  get weight() { return this.state.weight }
  set weight(value) { this.state.weight = value }

  get qty() { return this.state.qty }
  set qty(value) { this.state.qty = this.stackable ? Math.max(0, value) : 1 }

  get isInInventory() { return store.player.has(this) }

  canExamine(showMessage) {
    if (!this.isExaminable) {
      if (showMessage) {
        log(`${this.name} cannot be examined`)
      }
      return false
    }
    return true
  }

  async examine() {
    if (!this.canExamine(true)) {
      return false
    }
    log(`You examine the ${this.name.toLowerCase()} but find nothing particular about it.`)
    await emit.call(this, 'onExamine')
    return true
  }

  async onExamine() {}
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
])
