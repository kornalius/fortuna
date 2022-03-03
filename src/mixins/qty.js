export default {
  state: {
    qty: 1,
  },

  get stackable() { return false },

  get qty() { return this.state.qty },
  set qty(value) { this.state.qty = this.stackable ? Math.max(0, value) : 1 },
}
