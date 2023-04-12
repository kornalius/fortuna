/**
 * Add x, y positions states to an object
 */

import { State } from '@/entity'

export interface IPositionSetupData {
  // x position
  x?: number
  // y position
  y?: number
}

export interface IPosition {
  state: State
  get x(): number
  set x(value)
  get y(): number
  set y(value)
}

export const Position: IPosition = {
  state: {
    x: 0,
    y: 0,
  } as IPositionSetupData,

  get x(): number { return this.state.x },
  set x(value) { this.state.x = value },

  get y(): number { return this.state.y },
  set y(value) { this.state.y = value },
}
