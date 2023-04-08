/**
 * Adds an experience state to the object
 */

import { State } from '@/entity'
import { ILevel } from './level'

export interface IXp extends ILevel {
  state: State
  get xp(): number
  set xp(value)
  get nextXp(): number
}

// @ts-ignore
export const Xp: IXp = {
  state: {
    // current experience of the object
    xp: 0,
  },

  get xp(): number { return this.state.xp },
  set xp(value) { this.state.xp = Math.max(0, value) },
  get nextXp(): number { return 100 * Math.pow(this.lvl, 2) },
}
