/**
 * Makes the object visitable
 */

import { can, emit, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameData } from './name'

export interface IVisitableData extends
  INameData
{
  // is the object visitable
  visitable?: boolean
  // number of times the object has been visited
  visited?: number
  onVisit?: () => Promise<void>
}

export interface IVisitable extends
  IName
{
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
    visitable: true,
    visited: 0,
  } as IVisitableData,

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
        log: () => `You cannot visit ${this.nameDisplay}`,
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
