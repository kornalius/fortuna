/**
 * Add level state to object
 */

import clamp from 'lodash/clamp'
import { State } from '@/entity'

export interface ILevel {
  state: State
  get lvl(): number
  set lvl(value)
  get highestLvl(): number
}

export const Level: ILevel = {
  state: {
    lvl: 1,
  },

  get lvl(): number { return this.state.lvl },
  set lvl(value) { this.state.lvl = clamp(value, 1, this.highestLvl) },
  get highestLvl(): number { return window.store.config.highestLvl },
}
