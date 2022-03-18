import dayjs from 'dayjs'

/**
 * Makes an object timeout until being available again
 */

export default {
  state: {
    // when the timeout started (timestamp)
    timeoutStart: 0,
    // length of the timeout in ms
    timeoutLength: 0,
  },

  get timeoutStart() { return this.state.timeoutStart },
  set timeoutStart(value) { this.state.timeoutStart = value },

  get timeoutLength() { return this.state.timeoutLength },
  set timeoutLength(value) { this.state.timeoutLength = value },

  get isTimedout() { return this.timeoutLength > 0 && this.timeoutStart > 0 },

  get timeoutRemaining() { return this.isTimedout ? Date.now() - this.timeoutStart : 0 },

  get timeoutRemainingString() { return dayjs(this.timeoutRemaining).format('HH:mm:ss') },

  clearTimeout() {
    this.timeoutStart = 0
    this.timeoutLength = 0
  },

  timeoutFor(length) {
    this.timeoutStart = Date.now()
    this.timeoutLength = length
    setTimeout(() => {
      this.clearTimeout()
    }, length)
  },
}
