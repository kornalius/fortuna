export default {
  state: {
    weight: 0,
  },

  get weight() { return this.state.weight },
  set weight(value) { this.state.weight = value },
}
