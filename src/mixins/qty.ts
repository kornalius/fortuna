/**
 * Add a quantity state to object
 */

import { State } from '@/entity'

export interface IQty {
  state: State
  get stackableCode(): string | null
  set stackableCode(value)
  get qty(): number
  set qty(value)
}

export const Qty: IQty = {
  state: {
    // code matching item in inventory
    stackableCode: null,
    // quantity
    qty: 1,
  },

  get stackableCode(): string | null { return this.state.stackableCode },
  set stackableCode(value) { this.state.stackableCode = value },

  get qty(): number { return this.state.qty },
  set qty(value) { this.state.qty = Math.max(0, value) },
}
