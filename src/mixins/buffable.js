export default {
  state: {
    buffs: [],
  },

  get buffs() { return this.state.buffs },
  set buffs(value) { this.state.buffs = value },
  get hasBuffs() { return this.state.buffs.length > 0 },

  addBuff(target, name, value) {
    this.state.buffs.push({ targetId: target?.id, targetStore: target?.store, name, value })
  },

  removeBuff(target, name) {
    this.state.buffs = this.state.buffs.filter(b => (
      (!target || b.targetId === target.id) && (!name || b.name === name)
    ))
  },

  hasBuffsFor(target, name) {
    return this.buffsFor(target, name).length > 0
  },

  buffsFor(target, name) {
    return this.state.buffs.filter(b => (
      (!target || b.targetId === target.id) && (!name || b.name === name)
    ))
  },

  sumOfBuffs(target, name) {
    return this.buffsFor(target, name).reduce((acc, b) => acc + b.value, 0) || 0
  }
}
