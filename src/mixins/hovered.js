/**
 * Add hovered state to the object
 */

export default {
  state: {
    // has the object been hovered with mouse
    hovered: false,
  },

  get isNew() { return !this.state.hovered },
  set hovered(value) { this.state.hovered = value },
}
