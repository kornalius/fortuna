export default {
  state: {
    renameable: true,
    name: '',
  },

  get name() { return this.state.name },
  set name(value) {
    if (this.renameable) {
      this.state.name = value
    }
  },

  rename(name) {
    this.name = name
  },
}
