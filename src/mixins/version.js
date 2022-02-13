export default {
  state: {
    version: 1,
  },

  get version() { return this.state.version },
  set version(value) { this.state.version = value },
}
