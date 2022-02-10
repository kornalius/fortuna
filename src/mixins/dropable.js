import { log } from '@/utils'

export default {
  state: {
    dropable: true,
    actions: [
      item => (
        item.canDrop()
          ? {
            label: 'Drop',
            key: 'drop',
            icon: 'fa-solid:hand-holding',
            class: 'rotate-180 mt2',
            disabled: false,
            click: async () => item.drop(),
          }
          : undefined
      ),
    ],
  },

  get isDropable() { return this.state.dropable },
  set dropable(value) { this.state.dropable = value },

  canDrop(showMessage) {
    if (!this.isDropable) {
      if (showMessage) {
        log(`${this.name} cannot be dropped`)
      }
      return false
    }
    if (!store.player.has(this)) {
      if (showMessage) {
        log(`${this.name} needs to be in your inventory first`)
      }
      return false
    }
    return true
  },

  async drop() {
    if (!this.canDrop(true)) {
      return false
    }
    this.location = store.game.room
    log(`You drop the ${this.name}`)
    return true
  },
}
