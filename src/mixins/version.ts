/**
 * Adds a version state to the object (for Softwares and Files)
 */

import { State } from '@/entity'

export interface IVersionData {
  // version of the object
  version?: number
}

export interface IVersion {
  state: State
  get version(): number
  set version(value)
}

export const Version: IVersion = {
  state: {
    version: 1,
  },

  get version(): number { return this.state.version },
  set version(value) { this.state.version = value },
}
