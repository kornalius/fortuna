/**
 * Makes the object visitable
 */

import { can, emit, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName } from './name'

export interface IVisitable extends IName {
  state: State
  get isVisitable(): boolean
  set visitable(value: boolean)
  get visited(): number
  set visited(value)
  get firstVisit(): boolean
  get hasVisited(): boolean
  canVisit(showMessage?: boolean): boolean
  visit(): Promise<boolean>
  onVisit(): Promise<void>
}

// @ts-ignore
export const Visitable: IVisitable = {
  state: {
    // is the object visitable
    visitable: true,
    // number of times the object has been visited
    visited: 0,
  },

  get isVisitable(): boolean { return this.state.visitable },
  set visitable(value: boolean) { this.state.visitable = value },

  get visited(): number { return this.state.visited },
  set visited(value) { this.state.visited = value },

  get firstVisit(): boolean { return this.visited === 1 },
  get hasVisited(): boolean { return this.visited > 0 },

  canVisit(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isVisitable,
        log: () => `You cannot visit ${this.name.toLowerCase()}`,
        level: LOG_WARN
      },
    ], showMessage)
  },

  async visit(): Promise<boolean> {
    if (!this.canVisit(true)) {
      return false
    }
    this.visited += 1
    await emit(this, 'onVisit')
    return true
  },

  async onVisit(): Promise<void> {},
}
