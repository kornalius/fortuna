/**
 * Add hovered state to the object
 */

import { State } from '@/entity'

export interface IHovered {
  state: State
  get isNew(): boolean
  set hovered(value: boolean)
}
export const Hovered: IHovered = {
  state: {
    // has the object been hovered with mouse
    hovered: false,
  },

  get isNew(): boolean { return !this.state.hovered },
  set hovered(value: boolean) { this.state.hovered = value },
}
