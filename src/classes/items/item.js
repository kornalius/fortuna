import Entity from '../../entity'
import { store } from '../../store';

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
      img: undefined,
      ...data,
      location: undefined,
    }
  }

  get name() { return this.state.name }
  set name(value) { this.state.name = value }

  get stackable() { return false }

  get locationId() { return this.state.locationId }
  get locationStore() { return this.state.locationStore }
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

  get img() { return this.state.img }
  set img(value) { this.state.img = value }

  rename(name) {
    this.name = name
  }
}
