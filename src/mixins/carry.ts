/**
 * Provide max carrying weight and check if player or npc can move (not encumbered)
 */

import { can } from '@/utils'
import { State } from '@/entity'
import { IItems, IItemsData } from './items'
import { ILevel, ILevelData } from './level'

export interface ICarryData extends
  IItemsData,
  ILevelData
{}

export interface ICarry extends
  IItems,
  ILevel
{
  state: State
  get maxWeight(): number
  get carryWeight(): number
  canMove(showMessage?: boolean): boolean
}

// @ts-ignore
export const Carry: ICarry = {
  state: {} as ICarryData,

  get maxWeight(): number { return 10 * Math.pow(this.lvl, 2)  },
  get carryWeight(): number {
    return this.items
      .filter(item => !(item as any).isSoftware && !(item as any).isFile)
      .reduce((acc, item) => acc + (item as any).weight, 0)
  },

  canMove(showMessage: boolean = false): boolean {
    return can(this, [
      {
        expr: () => this.carryWeight > this.maxWeight,
        log: () => 'You are carrying too much, you cannot move'
      },
    ], showMessage)
  },
}
