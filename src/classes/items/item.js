import Entity from '@/entity'
import { store } from '@/store'
import { log, mixin } from '@/utils'
import Name from '@/mixins/name'
import Actions from '@/mixins/actions'
import Pickable from '@/mixins/pickable'
import Dropable from '@/mixins/dropable'
import Usable from '@/mixins/usable'

export default class Item extends Entity {
  setupInstance(data) {
    let locationId
    let locationStore

    if (data.location) {
      locationId = data.location.id
      locationStore = data.location.store
    }

    return {
      name: 'Item',
      description: 'An item',
      qty: 1,
      weight: 0,
      locationId,
      locationStore,
      icon: null,
      actions: [
        item => ({
          label: 'Examine',
          key: 'examine',
          icon: 'emojione:eye',
          click: async () => item.examine(),
        }),
      ],
      actionsOrder: [
        'examine',
      ],
      ...data,
    }
  }

  get stackable() { return false }

  get locationId() { return this.state.locationId }
  set locationId(value) { this.state.locationId = value }
  get locationStore() { return this.state.locationStore }
  set locationStore(value) { this.state.locationStore = value }
  get location() {
    return this.state.locationStore && this.state.locationId
      ? store[this.state.locationStore].get(this.state.locationId)
      : undefined
  }
  set location(value) {
    if (value) {
      this.state.locationId = value.id
      this.state.locationStore = value.store
    } else {
      this.state.locationId = null
      this.state.locationStore = null
    }
  }

  get description() { return this.state.description }
  set description(value) { this.state.description = value }

  get weight() { return this.state.weight }
  set weight(value) { this.state.weight = value }

  get qty() { return this.state.qty }
  set qty(value) { this.state.qty = this.stackable ? Math.max(0, value) : 1 }

  get icon() { return this.state.icon }
  set icon(value) { this.state.icon = value }

  get isInInventory() { return store.player.has(this) }

  // set the software busy state
  setBusy(software, value) {
    if (software) {
      software.busy = value
    }
  }

  onAction(action) {
  }

  async examine() {
    log(`You examine the ${this.name} but find nothing particular about it.`)
  }
}

mixin(Item, [Name, Actions, Pickable, Dropable, Usable])
