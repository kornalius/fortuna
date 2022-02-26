import { emit } from '@/utils';

export default {
  state: {
    visited: 0,
  },

  get visited() { return this.state.visited },
  set visited(value) { this.state.visited = value },

  get firstVisit() { return this.visited === 1 },
  get hasVisited() { return this.visited > 0 },

  async visit() {
    this.visited += 1
    await emit.call(this, 'onVisit')
    return true
  },
}
