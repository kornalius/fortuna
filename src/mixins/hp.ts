/**
 * Add hp state to the object
 */

import clamp from 'lodash/clamp'
import { State } from '@/entity'
import { ILevel, ILevelData } from './level'
import { IBuffable, IBuffableData } from './buffable'

export interface IHpData extends
  ILevelData,
  IBuffableData
{
  // current hp
  hp?: number
  // levelup extra hp applied to the maxHp
  extraHp?: number
}

export interface IHp extends
  ILevel,
  IBuffable
{
  state: State
  get hp(): number
  set hp(value)
  get extraHp(): number
  set extraHp(value)
  get baseHp(): number
  get highestHp(): number
  get maxHp(): number
  get isDead(): boolean
}

// @ts-ignore
export const Hp: IHp = {
  state: {
    hp: 0,
    extraHp: 0,
  } as IHpData,

  get hp(): number { return this.state.hp + this.sumOfBuffs('hp') },
  set hp(value) { this.state.hp = clamp(value, 0, this.maxHp) },

  get extraHp(): number { return this.state.extraHp },
  set extraHp(value) { this.state.extraHp = Math.max(0, value) },

  get baseHp(): number { return window.store.config.baseHp },

  get highestHp(): number { return window.store.config.highestHp },

  /**
   * calculate the max hp based on level and extraHp
   * @returns {number}
   */
  get maxHp(): number {
    return Math.floor(
      this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl
    ) + this.extraHp
  },

  get isDead(): boolean { return this.hp <= 0 },
}
