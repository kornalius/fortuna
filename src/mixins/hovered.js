export default {
  state: {
    hovered: false,
  },

  get isNew() { return !this.state.hovered },
  set hovered(value) { this.state.hovered = value },
}
