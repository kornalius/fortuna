/**
 * Add a name state to object
 */

import { State } from '@/entity'

export interface IName {
  state: State
  get renameable(): boolean
  set renameable(renameable)
  get name(): string
  set name(value)
  rename(name: string): void
}

export const Name: IName = {
  state: {
    // is the object renamable
    renameable: true,
    // object name
    name: '',
  },

  get renameable(): boolean { return this.state.renameable },
  set renameable(renameable) { this.state.renameable = renameable },

  get name(): string { return this.state.name },
  set name(value) {
    if (this.renameable) {
      this.state.name = value
    }
  },

  rename(name: string): void {
    this.name = name
  },
}
