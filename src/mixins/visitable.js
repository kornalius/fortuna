import { emit, LOG_WARN } from '@/utils'

/**
 * Makes the object visitable
 */

export default {
  state: {
    // is the object visitable
    visitable: true,
    // number of times the object has been visited
    visited: 0,
  },

  get isVisitable() { return this.state.visitable },
  set visitable(value) { this.state.visitable = value },

  get visited() { return this.state.visited },
  set visited(value) { this.state.visited = value },

  get firstVisit() { return this.visited === 1 },
  get hasVisited() { return this.visited > 0 },

  canVisit(showMessage) {
    if (!this.isVisitable) {
      if (showMessage) {
        log(`You cannot visit ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      }
      return false
    }
    return true
  },

  async visit() {
    if (!this.canVisit(true)) {
      return false
    }
    this.visited += 1
    await emit.call(this, 'onVisit')
    return true
  },

  async onVisit() {}
}
