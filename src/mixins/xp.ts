/**
 * Adds an experience state to the object
 */

import { State } from '@/entity'
import { ILevel, ILevelData } from './level'

export interface IXpData extends
  ILevelData
{
  // current experience of the object
  xp?: number
}

export interface IXp extends
  ILevel
{
  state: State
  get xp(): number
  set xp(value)
  get nextXp(): number
}

// @ts-ignore
export const Xp: IXp = {
  state: {
    xp: 0,
  } as IXpData,

  get xp(): number { return this.state.xp },
  set xp(value) { this.state.xp = Math.max(0, value) },
  get nextXp(): number { return 100 * Math.pow(this.lvl, 2) },
}
