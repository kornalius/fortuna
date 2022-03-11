/**
 * Add a quantity state to object
 */

export default {
  state: {
    // code matching item in inventory
    stackableCode: null,
    // quantity
    qty: 1,
  },

  get stackableCode() { return this.state.stackableCode },
  set stackableCode(value) { this.state.stackableCode = value },

  get qty() { return this.state.qty },
  set qty(value) { this.state.qty = Math.max(0, value) },
}
