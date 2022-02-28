import { store } from '@/store';

export default {
  state: {
    locationId: null,
    locationStore: null,
  },

  get locationId() { return this.state.locationId },
  set locationId(value) { this.state.locationId = value },

  get locationStore() { return this.state.locationStore },
  set locationStore(value) { this.state.locationStore = value },

  get location() {
    return this.state.locationStore && this.state.locationId
      ? store[this.state.locationStore].get(this.state.locationId)
      : undefined
  },
  set location(value) {
    if (value) {
      this.state.locationId = value.id
      this.state.locationStore = value.store
    } else {
      this.state.locationId = null
      this.state.locationStore = null
    }
  },

  setupLocation(data) {
    let locationId
    let locationStore

    if (data?.location) {
      locationId = data.location.id
      locationStore = data.location.store
    }

    return { locationId, locationStore }
  },
}
