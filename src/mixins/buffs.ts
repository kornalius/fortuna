/**
 * Buffs that can be applied to another object
 */

import { State } from '@/entity'
import { IBuffable } from '@/mixins/buffable'

export interface IBuff {
  name: string
  value: number
  time?: number
  turns?: number
  rolls?: number
}

export interface IBuffsData {
  // buffs to apply to an player or npc stats { name, value, time, turns, rolls }
  buffs?: IBuff[],
}

export interface IBuffs {
  state: State
  get buffs(): IBuff[]
  set buffs(value)
  get hasBuffs(): boolean
  hasBuffsFor(name: string): boolean
  buffsFor(name: string): IBuff[]
  sumOfBuffs(name: string): number
  applyBuffsTo(o: IBuffable): boolean
}

export const Buffs: IBuffs = {
  state: {
    buffs: [],
  } as IBuffsData,

  get buffs(): IBuff[] { return this.state.buffs },
  set buffs(value) { this.state.buffs = value },
  get hasBuffs(): boolean { return this.buffs.length > 0 },

  hasBuffsFor(name: string): boolean {
    return this.buffsFor(name).length > 0
  },

  buffsFor(name: string): IBuff[] {
    return this.buffs.filter(b => b.name === name)
  },

  sumOfBuffs(name: string): number {
    return this.buffsFor(name).reduce((acc, b) => acc + b.value, 0)
  },

  /**
   * Apply all buffs[] to another object
   *
   * @param o {IBuffable}
   * @returns {boolean}
   */
  applyBuffsTo(o: IBuffable): boolean {
    if (typeof o.addBuff !== 'function') {
      return false
    }
    this.buffs.forEach(b => {
      o.addBuff(b.name, b.value, b?.time, b.turns, b.rolls)
    })
    return true
  },
}
