export default {
  state: {
    buffs: [],
  },

  get buffs() { return this.state.buffs },
  set buffs(value) { this.state.buffs = value },
  get hasBuffs() { return this.state.buffs.length > 0 },

  addBuff(name, value, time = 0) {
    this.state.buffs.push({ name, value, time, startTime: Date.now() })
  },

  removeBuff(name) {
    this.state.buffs = this.state.buffs.filter(b => b.name === name)
  },

  processBuffs() {
    const toRemove = []
    this.buffs.forEach(b => {
      if (Date.now() - b.startTime <= 0) {
        toRemove.push(b)
      }
    })
    if (toRemove.length > 0) {
      this.state.buffs = this.state.buffs.filter(b => !toRemove.includes(b))
    }
  },

  hasBuffsFor(name) {
    return this.buffsFor(name).length > 0
  },

  buffsFor(name) {
    return this.state.buffs.filter(b => b.name === name)
  },

  sumOfBuffs(name) {
    return this.buffsFor(name).reduce((acc, b) => acc + b.value, 0) || 0
  }
}
