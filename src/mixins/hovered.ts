/**
 * Add hovered state to the object
 */

import { State } from '@/entity'

export interface IHoveredSetupData {
  // has the object been hovered with mouse
  hovered?: boolean
}

export interface IHovered {
  state: State
  get isNew(): boolean
  set hovered(value: boolean)
}

export const Hovered: IHovered = {
  state: {
    hovered: false,
  } as IHoveredSetupData,

  get isNew(): boolean { return !this.state.hovered },
  set hovered(value: boolean) { this.state.hovered = value },
}
