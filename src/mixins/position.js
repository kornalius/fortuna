/**
 * Add x, y positions states to an object
 */

export default {
  state: {
    x: 0,
    y: 0,
  },

  get x() { return this.state.x },
  set x(value) { this.state.x = value },

  get y() { return this.state.y },
  set y(value) { this.state.y = value },
}
