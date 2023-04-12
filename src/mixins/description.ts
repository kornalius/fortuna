/**
 * Add description
 */

import { State } from '@/entity'

export interface IDescriptionData {
  // description
  description?: string | null
}

export interface IDescription {
  state: State
  get description(): string | null
  set description(value)
}

export const Description: IDescription = {
  state: {
    description: null,
  } as IDescriptionData,

  get description(): string { return this.state.description },
  set description(value) { this.state.description = value },
}
