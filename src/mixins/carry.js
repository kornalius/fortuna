export default {
  state: {
  },

  get maxWeight() { return 10 * Math.pow(this.lvl, 2)  },
  get carryWeight() { return this.items.reduce((acc, item) => acc + item.weight, 0) },

  get canMove() { return this.carryWeight <= this.maxWeight },
}
