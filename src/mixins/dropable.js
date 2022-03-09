import { can, emit, log } from '@/utils'
import { store } from '@/store'

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
    this.location = store.game.room
    this.hovered = false
    log(`You drop ${this.name.toLowerCase()}`)
    await emit.call(this, 'onDrop')
    return true
  },

  async onDrop() {
    store.game.playSound('drop')
  },
}
