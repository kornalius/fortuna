import { store } from '@/store'

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
    if (this.locationStore) {
      if (this.locationId) {
        return store[this.locationStore].get(this.locationId)
      }
      return this.locationStore
    }
    return null
  },
  set location(value) {
    this.locationId = null
    this.locationStore = null

    if (value) {
      // in case of value === store.player, store.game, ...
      if (!value.store && !value.id) {
        this.locationStore = value
      } else if (value.store && value.id) {
        this.locationId = value.id
        this.locationStore = value.store
      }
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
