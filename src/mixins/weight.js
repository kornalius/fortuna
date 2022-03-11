/**
 * Adds a weight state to object
 */

export default {
  state: {
    // weight of the object
    weight: 0,
  },

  get weight() { return this.state.weight },
  set weight(value) { this.state.weight = value },
}
