export default {
  state: {
    xp: 0,
  },

  get xp() { return this.state.xp },
  set xp(value) { this.state.xp = Math.max(0, value) },
  get nextXp() { return 100 * Math.pow(this.lvl, 2) },
}
