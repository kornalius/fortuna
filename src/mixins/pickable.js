import { can, emit, log } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object pickable
 */

export default {
  state: {
    // is the object pickable
    pickable: true,
    actions: [
      item => (
        item.isPickable && !store.player.has(item)
          ? {
            label: item.pickupLabel,
            key: 'pickup',
            icon: 'pickup',
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

  /**
   * Returns the pickup label with its requirements
   *
   * @returns {string}
   */
  get pickupLabel() {
    return `Pickup ${this.requirementsLabelFor('pickup')}`
  },

  canPickup(showMessage) {
    return can(this, [
      {
        expr: () => !this.isPickable,
        log: () => `${this.name} cannot be picked`
      },
      {
        expr: () => store.player.has(this),
        log: () => `${this.name} is already in your inventory`
      },
    ], showMessage, 'pickup')
  },

  /**
   * Pickup the item to the player's inventory
   *
   * @returns {Promise<boolean>}
   */
  async pickup() {
    if (!this.canPickup(true)) {
      return false
    }

    // check if there are owners of this room/building present seeing you commit the crime of stealing!!!
    const presentOwners = this.location.presentOwners;
    if (presentOwners?.length > 0) {
      log(`You have been caugth stealing ${presentOwners.map(o => o.name).join(', ')}`)
      presentOwners.forEach(o => { o.aggresive = true })
    }

    store.player.addItem(this)

    // mark item in your inventory as new
    this.hovered = false

    log(`You pickup ${this.name.toLowerCase()}`)
    await emit.call(this, 'onPickup')
    return true
  },

  async onPickup() {
    store.game.playSound('pickup')
  },
}
