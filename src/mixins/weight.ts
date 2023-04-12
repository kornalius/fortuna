/**
 * Adds a weight state to object
 */

import { State } from '@/entity'

export interface IWeightSetupData {
  // weight of the object
  weight?: number
}

export interface IWeight {
  state: State
  get weight(): number
  set weight(value)
}

export const Weight: IWeight = {
  state: {
    weight: 0,
  } as IWeightSetupData,

  get weight(): number { return this.state.weight },
  set weight(value) { this.state.weight = value },
}
