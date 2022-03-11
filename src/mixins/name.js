/**
 * Add a name state to object
 */

export default {
  state: {
    // is the object renamable
    renameable: true,
    // object name
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
