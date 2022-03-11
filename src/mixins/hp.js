import clamp from 'lodash/clamp'
import { store } from '@/store'

/**
 * Add hp state to the object
 */

export default {
  state: {
    // current hp
    hp: 0,
    // levelup extra hp applied to the maxHp
    extraHp: 0,
  },

  get hp() { return this.state.hp + this.sumOfBuffs(this, 'hp') },
  set hp(value) { this.state.hp = clamp(value, 0, this.maxHp) },

  get extraHp() { return this.state.extraHp },
  set extraHp(value) { this.state.extraHp = Math.max(0, value) },

  get baseHp() { return store.config.baseHp },

  get highestHp() { return store.config.highestHp },

  /**
   * calculate the max hp based on level and extraHp
   * @returns {number}
   */
  get maxHp() {
    return Math.floor(
      this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl
    ) + this.extraHp
  },

  get isDead() { return this.hp <= 0 },
}
