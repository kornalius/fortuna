import Entity from '@/entity'
import { store } from '@/store'
import { mixin } from '@/utils'
import Actions from '@/mixins/actions'

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
      qty: 0,
      weight: 0,
      locationId,
      locationStore,
      icon: undefined,
      actions: [
        () => ({
          label: 'Examine',
          key: 'examine',
          icon: 'emojione:eye',
          click: () => console.log('examine'),
        }),
      ],
      actionsOrder: [
        'examine',
      ],
      ...data,
      location: undefined,
    }
  }

  get name() { return this.state.name }
  set name(value) { this.state.name = value }

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
      this.state.locationId = undefined
      this.state.locationStore = undefined
    }
  }

  get weight() { return this.state.weight }
  set weight(value) { this.state.weight = value }

  get qty() { return this.state.qty }
  set qty(value) {
    this.state.qty = this.stackable
      ? Math.max(0, value)
      : 1
  }

  get icon() { return this.state.icon }
  set icon(value) { this.state.icon = value }

  rename(name) {
    this.name = name
  }
}

mixin(Item, [Actions])
