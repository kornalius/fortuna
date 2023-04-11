/**
 * Add a name state to object
 */

import { State } from '@/entity'
import capitalize from 'lodash/capitalize'

export interface IName {
  state: State
  get renameable(): boolean
  set renameable(renameable)
  get name(): string | null
  set name(value)
  get nameDisplay(): string
  get nameProper(): string
  rename(name: string): void
}

export const Name: IName = {
  state: {
    // is the object renamable
    renameable: true,
    // object name
    name: null,
  },

  get renameable(): boolean { return this.state.renameable },
  set renameable(value) { this.state.renameable = value },

  get name(): string | null { return this.state.name },
  set name(value) {
    if (this.renameable) {
      this.state.name = value
    }
  },

  get nameDisplay(): string { return this.name?.toLowerCase() || 'unnamed' },
  get nameProper(): string { return capitalize(this.name || 'unnamed') },

  rename(name: string): void {
    this.name = name
  },
}
