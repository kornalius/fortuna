/**
 * Add credits
 */

import { State } from '@/entity'
import { IBuffable } from '@/mixins/buffable'

export interface ICredits extends IBuffable {
  state: State
  get credits(): number
  set credits(value)
}

// @ts-ignore
export const Credits: ICredits = {
  state: {
    credits: 0,
  },

  get credits(): number { return this.state.credits + this.sumOfBuffs('credit') },
  set credits(value) { this.state.credits = Math.max(0, value) },
}
