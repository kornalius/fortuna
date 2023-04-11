/**
 * Add a quantity state to object
 */

import { State } from '@/entity'
import random from 'lodash/random'

export interface IQty {
  state: State
  get stackableCode(): string | null
  set stackableCode(value)
  get qty(): number
  set qty(value)
  get randomQty(): number
}

export const Qty: IQty = {
  state: {
    // code matching item in inventory
    stackableCode: null,
    // quantity
    qty: 1,
    // maximum random qty set at setupInstance
    randomQty: 0,
    // random qty onced set
    _randomQty: 0,
  },

  get stackableCode(): string | null { return this.state.stackableCode },
  set stackableCode(value) { this.state.stackableCode = value },

  get qty(): number {
    if (this.state._randomQty === 0 && this.state.randomQty > 0) {
      this.state._randomQty = random(this.state.randomQty)
    }
    return this.state._randomQty || this.state.qty
  },
  set qty(value) { this.state.qty = Math.max(0, value) },

  get randomQty(): number { return this.state.randomQty },
}
