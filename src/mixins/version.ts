/**
 * Adds a version state to the object (for Softwares and Files)
 */

import { State } from '@/entity'

export interface IVersion {
  state: State
  get version(): number
  set version(value)
}

export const Version: IVersion = {
  state: {
    // version of the object
    version: 1,
  },

  get version(): number { return this.state.version },
  set version(value) { this.state.version = value },
}
