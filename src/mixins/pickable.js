import { emit, log } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    pickable: true,
    actions: [
      item => (
        item.isPickable && !store.player.has(item)
          ? {
            label: item.pickupLabel,
            key: 'pickup',
            icon: 'fa-solid:hand-lizard',
            class: 'rotate-270',
            disabled: !item.canPickup(),
            click: async () => item.pickup(),
          }
          : undefined
      ),
    ],
  },

  get isPickable() { return this.state.pickable },
  set pickable(value) { this.state.pickable = value },

  get pickupLabel() {
    return `Pickup ${this.requirementsLabelFor('pickup')}`
  },

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
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('pickup', showMessage));
  },

  async pickup() {
    if (!this.canPickup(true)) {
      return false
    }
    this.locationId = null
    this.locationStore = store.player.storeName
    this.hovered = false
    log(`You pickup ${this.name.toLowerCase()}`)
    await emit.call(this, 'onPickup')
    return true
  },

  async onPickup() {
    store.game.playSound('pickup')
  },
}
