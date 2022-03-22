import { can, emit, log, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Make the object droppable
 */

export default {
  state: {
    // is the object droppable or not
    dropable: true,
    actions: [
      item => (
        item.isDropable && store.player.has(item)
          ? {
            label: item.dropLabel,
            key: 'drop',
            icon: 'drop',
            disabled: !item.canDrop(),
            click: async () => item.drop(),
          }
          : undefined
      ),
    ],
  },

  get isDropable() { return this.state.dropable },
  set dropable(value) { this.state.dropable = value },

  get dropLabel() {
    return `Drop ${this.requirementsLabelFor('drop')}`
  },

  canDrop(showMessage) {
    return can(this, [
      {
        expr: () => !this.isDropable,
        log: () => `${this.name} cannot be dropped`
      },
      {
        expr: () => !store.player.has(this),
        log: () => `${this.name} needs to be in your inventory first`
      },
      {
        expr: () => this.isSoftware && this.isInstalled,
        log: () => `${this.name} needs to be uninstalled first`
      },
      {
        expr: () => this.isInstalled,
        log: () => `${this.name} needs to be uninstalled first`
      },
    ], showMessage, 'drop')
  },

  async drop() {
    if (!this.canDrop(true)) {
      return false
    }
    // place back in the current room
    this.location = store.game.room
    // the object is now new to its new location
    this.hovered = false
    log(`You drop ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
    await emit.call(this, 'onDrop')
    return true
  },

  async onDrop() {
    store.game.playSound('drop')
  },
}
