export default {
  state: {
    code: null,
  },

  get code() { return this.state.code },
  set code(value) { this.state.code = value },
}
