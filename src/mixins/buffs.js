export default {
  state: {
    // buffs to apply to an player or npc stats { name, value, time, turns, rolls }
    buffs: [],
  },

  get buffs() { return this.state.buffs },
  set buffs(value) { this.state.buffs = value },
  get hasBuffs() { return this.buffs.length > 0 },

  hasBuffsFor(name) {
    return this.buffsFor(name).length > 0
  },

  buffsFor(name) {
    return this.buffs.filter(b => b.name === name)
  },

  sumOfBuffs(name) {
    return this.buffsFor(name).reduce((acc, b) => acc + b.value, 0)
  },

  applyBuffsTo(o) {
    if (typeof o.addBuff !== 'function') {
      return false
    }
    this.buffs.forEach(b => {
      o.addBuff(b.name, b.value, b.time)
    })
    return true
  },
}
