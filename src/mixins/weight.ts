/**
 * Adds a weight state to object
 */

import { State } from '@/entity'

export interface IWeight {
  state: State
  get weight(): number
  set weight(value)
}

export const Weight: IWeight = {
  state: {
    // weight of the object
    weight: 0,
  },

  get weight(): number { return this.state.weight },
  set weight(value) { this.state.weight = value },
}
