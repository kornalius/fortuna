import clamp from 'lodash/clamp'
import { store } from '@/store'

export default {
  state: {
    hp: 0,
    extraHp: 0,
  },

  get hp() { return this.state.hp + this.sumOfBuffs(this, 'hp') },
  set hp(value) { this.state.hp = clamp(value, 0, this.maxHp) },

  get extraHp() { return this.state.extraHp },
  set extraHp(value) { this.state.extraHp = Math.max(0, value) },

  get baseHp() { return store.config.baseHp },

  get highestHp() { return store.config.highestHp },

  get maxHp() {
    return Math.floor(
      this.baseHp + (this.highestHp - this.baseHp) * this.lvl / this.highestLvl
    ) + this.extraHp
  },

  get isDead() { return this.hp <= 0 },
}
