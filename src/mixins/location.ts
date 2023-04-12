/**
 * Add parent location support to object
 */

import { State } from '@/entity'
import { AnyData } from '@/utils'

export interface ILocationData {
  // id of the parent location object
  locationId?: string | null
  // store of the parent location object
  locationStore?: string | null,
}

export interface ILocation {
  state: State
  get locationId(): string | null
  set locationId(value)
  get locationStore(): string | null
  set locationStore(value)
  get location(): AnyData | undefined
  set location(value)
  setupLocation(data?: { location?: any }): { locationId?: string, locationStore?: string }
}

export const Location: ILocation = {
  state: {
    locationId: null,
    locationStore: null,
  } as ILocationData,

  get locationId(): string | null { return this.state.locationId },
  set locationId(value) { this.state.locationId = value },

  get locationStore(): string | null { return this.state.locationStore },
  set locationStore(value) { this.state.locationStore = value },

  get location(): AnyData | undefined {
    if (this.locationStore) {
      if (this.locationId) {
        return (window.store as any)[this.locationStore].get(this.locationId)
      }
    }
    return undefined
  },
  set location(value) {
    this.locationId = null
    this.locationStore = null

    if (value) {
      this.locationId = value.id
      this.locationStore = value.store
    }
  },

  /**
   * Used mainly with setupInstance. Returns the locationId and locationStore from a location object in the data
   *
   * @param data {object}
   * @returns {{locationId, locationStore}}
   */
  setupLocation(data?: { location?: any }): { locationId?: string, locationStore?: string } {
    let locationId
    let locationStore

    if (data?.location) {
      locationId = data.location.id
      locationStore = data.location.store
    }

    return { locationId, locationStore }
  },
}
