/**
 * Add an icon state to object
 */

export default {
  state: {
    icon: null,
  },

  get icon() { return this.state.icon },
  set icon(value) { this.state.icon = value },
}
