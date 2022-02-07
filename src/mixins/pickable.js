import { log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    pickable: true,
    actions: [
      item => (
        item.isPickable
          ? {
            label: 'Pickup',
            key: 'pickup',
            icon: 'fa-solid:hand-lizard',
            class: 'rotate-270',
            disabled: false,
            click: () => item.pickup(),
          }
          : undefined
      ),
    ],
  },

  get isPickable() { return this.state.pickable },
  set pickable(value) { this.state.pickable = value },

  get canPickup() {
    return true
  },

  pickup() {
    if (!this.canPickup) {
      return false
    }
    if (!this.isPickable) {
      log(`You cannot pickup the ${this.name}`)
      return false
    }
    this.locationId = undefined
    this.locationStore = store.player.storeName
    log(`You pickup the ${this.name}`)
    return true
  },
}
