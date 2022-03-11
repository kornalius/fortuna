import { buffNames } from '@/buffs'

/**
 * Active buffs applied to the object
 */

export default {
  state: {
    // buffs currently applied to object's stats { name, value, time, turns, rolls }
    buffs: [],
  },

  get buffs() { return this.state.buffs },
  set buffs(value) { this.state.buffs = value },
  get hasBuffs() { return this.buffs.length > 0 },

  /**
   * Add a buff to the item
   *
   * @param name {string}
   * @param value {number}
   * @param time {number} time to remain active
   * @param turns {number} number of turns active
   * @param rolls {number} number of rolls active
   * @returns {boolean}
   */
  addBuff(name, value, time = 0, turns = 0, rolls = 0) {
    if (!buffNames.includes(name)) {
      return false
    }
    this.buffs.push({ name, value, time, turns, rolls })
    return true
  },

  /**
   * Remove a buff by its name from the item
   * @param name
   */
  removeBuff(name) {
    this.buffs = this.buffs.filter(b => b.name === name)
  },

  /**
   * Process battle buffs for turns or rolls only
   *
   * @param turn {boolean} process for a turn
   * @param roll {boolean} process for a roll
   */
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

  /**
   * Is a buff exists on an item
   *
   * @param name {string}
   * @returns {boolean}
   */
  hasBuffsFor(name) {
    return this.buffsFor(name).length > 0
  },

  /**
   * Returns all buffs with a specific name
   *
   * @param name {string}
   * @returns {object[]}
   */
  buffsFor(name) {
    return this.buffs.filter(b => b.name === name)
  },

  /**
   * Sums up all buffs values
   *
   * @param name {string}
   * @returns {number}
   */
  sumOfBuffs(name) {
    return this.buffsFor(name).reduce((acc, b) => acc + b.value, 0)
  },
}
