import { buffNames } from '@/buffs'

export default {
  state: {
    // buffs applied to stats { name, value, time, turns, rolls }
    buffs: [],
  },

  get buffs() { return this.state.buffs },
  set buffs(value) { this.state.buffs = value },
  get hasBuffs() { return this.buffs.length > 0 },

  addBuff(name, value, time = 0) {
    if (!buffNames.includes(name)) {
      return false
    }
    this.buffs.push({ name, value, time })
    return true
  },

  removeBuff(name) {
    this.buffs = this.buffs.filter(b => b.name === name)
  },

  processBuffs(turn = false, roll = false) {
    const toRemove = []
    this.buffs.forEach(b => {
      if (turn && b.turns) {
        b.turns -= 1
        if (b.turns <= 0) {
          toRemove.push(b)
        }
      }

      if (roll && b.rolls) {
        b.rolls -= 1
        if (b.rolls <= 0) {
          toRemove.push(b)
        }
      }

      if (b.time) {
        b.time -= 1
        if (b.time <= 0) {
          toRemove.push(b)
        }
      }
    })
    if (toRemove.length > 0) {
      this.buffs = this.buffs.filter(b => !toRemove.includes(b))
    }
  },

  hasBuffsFor(name) {
    return this.buffsFor(name).length > 0
  },

  buffsFor(name) {
    return this.buffs.filter(b => b.name === name)
  },

  sumOfBuffs(name) {
    return this.buffsFor(name).reduce((acc, b) => acc + b.value, 0)
  },
}
