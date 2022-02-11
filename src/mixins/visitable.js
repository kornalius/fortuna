export default {
  state: {
    visited: 0,
  },

  get firstVisit() { return this.state.visited === 1 },
  get visited() { return this.state.visited },
  set visited(value) { this.state.visited = value },
}
