import { log } from '@/utils';

export default {
  state: {
  },

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  },
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) },

  canMove(showMessage) {
    if (this.carryWeight > this.maxWeight) {
      if (showMessage) {
        log('You are encumbered, you cannot move')
      }
      return false
    }
    return true
  },
}
