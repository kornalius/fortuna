export default {
  state: {
    description: '',
  },

  get description() { return this.state.description },
  set description(value) { this.state.description = value },
}
