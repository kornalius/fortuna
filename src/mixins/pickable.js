import { log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    pickable: true,
    actions: [
      item => (
        item.isPickable && !item.isInInventory
          ? {
            label: 'Pickup',
            key: 'pickup',
            icon: 'fa-solid:hand-lizard',
            class: 'rotate-270',
            disabled: false,
            click: async () => item.pickup(),
          }
          : undefined
      ),
    ],
  },

  get isPickable() { return this.state.pickable },
  set pickable(value) { this.state.pickable = value },

  canPickup(showMessage) {
    if (!this.isPickable) {
      if (showMessage) {
        log(`${this.name} cannot be picked`)
      }
      return false
    }
    if (store.player.has(this)) {
      if (showMessage) {
        log(`${this.name} is already in your inventory`)
      }
      return false
    }
    return true
  },

  async pickup() {
    if (!this.canPickup(true)) {
      return false
    }
    this.locationId = undefined
    this.locationStore = store.player.storeName
    log(`You pickup the ${this.name}`)
    return true
  },
}
