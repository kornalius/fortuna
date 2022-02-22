export default {
  state: {
    credits: 0,
  },

  get credits() { return this.state.credits },
  set credits(value) { this.state.credits = Math.max(0, value) },
}
