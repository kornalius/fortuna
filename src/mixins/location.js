import { store } from '@/store'

/**
 * Add parent location support to object
 */

export default {
  state: {
    // id of the parent location object
    locationId: null,
    // store of the parent location object
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

  /**
   * Used mainly with setupInstance. Returns the locationId and locationStore from a location object in the data
   *
   * @param data {object}
   * @returns {{locationId, locationStore}}
   */
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
