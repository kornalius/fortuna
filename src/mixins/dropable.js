import { log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    dropable: true,
    actions: [
      item => (
        item.isDropable && store.player.has(item)
          ? {
            label: 'Drop',
            key: 'drop',
            icon: 'fa-solid:hand-holding',
            class: 'rotate-180 mt2',
            disabled: false,
            click: () => item.drop(),
          }
          : undefined
      ),
    ],
  },

  get isDropable() { return this.state.dropable },
  set dropable(value) { this.state.dropable = value },

  get canDrop() {
    return true
  },

  drop() {
    if (!this.canDrop) {
      return false
    }
    if (!this.isDropable) {
      log(`You cannot drop the ${this.name}`)
      return false
    }
    this.location = game.store.room
    log(`You drop the ${this.name}`)
    return true
  },
}
