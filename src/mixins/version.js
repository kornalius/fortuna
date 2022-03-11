/**
 * Adds a version state to the object (for Softwares and Files)
 */

export default {
  state: {
    // version of the object
    version: 1,
  },

  get version() { return this.state.version },
  set version(value) { this.state.version = value },
}
