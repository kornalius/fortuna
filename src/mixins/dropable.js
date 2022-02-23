import { emit, log } from '@/utils'
import { store } from '@/store';

export default {
  state: {
    dropable: true,
    actions: [
      item => (
        item.isDropable && store.player.has(item)
          ? {
            label: item.dropLabel,
            key: 'drop',
            icon: 'fa-solid:hand-holding',
            class: 'rotate-180 mt2',
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
    if (this.isSoftware && this.isInstalled) {
      if (showMessage) {
        log(`${this.name} needs to be uninstalled first`)
      }
      return false
    }
    if (this.isInstalled) {
      if (showMessage) {
        log(`${this.name} needs to be uninstalled first`)
      }
      return false
    }
    return !(this.checkRequirementsFor && !this.checkRequirementsFor('drop', showMessage));
  },

  async drop() {
    if (!this.canDrop(true)) {
      return false
    }
    store.game.playSound('drop')
    this.location = store.game.room
    this.hovered = false
    log(`You drop ${this.name.toLowerCase()}`)
    await emit.call(this, 'onDrop')
    return true
  },

  async onDrop() {},
}
