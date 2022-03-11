import clamp from 'lodash/clamp'
import { store } from '@/store'

/**
 * Add level state to object
 */

export default {
  state: {
    lvl: 1,
  },

  get lvl() { return this.state.lvl },
  set lvl(value) { this.state.lvl = clamp(value, 1, this.highestLvl) },
  get highestLvl() { return store.config.highestLvl },
}
