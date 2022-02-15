import { log, emit } from '@/utils'

export default {
  state: {
    equippable: false,
    equipped: false,
    equipType: null,
    actions: [
      item => (
        item.canEquip()
          ? {
            label: item.equipWord,
            key: 'equip',
            icon: item.equipIcon,
            disabled: false,
            click: async () => item.equip(),
          }
          : undefined
      ),
      item => (
        item.canUnequip()
          ? {
            label: item.unequipWord,
            key: 'unequip',
            icon: item.unequipIcon,
            disabled: false,
            click: async () => item.unequip(),
          }
          : undefined
      ),
    ],
  },

  get isEquippable() { return this.state.equippable },
  set equippable(value) { this.state.equippable = value },

  get isEquipped() { return this.state.equipped },
  set equipped(value) { this.state.equipped = value },

  get equipType() { return this.state.equipType },
  set equipType(value) { this.state.equipType = value },

  get equipIcon() { return this.isSoftware ? 'whh:savetodrive' : 'bx:bxs-t-shirt' },
  get unequipIcon() { return this.isSoftware ? 'entypo:uninstall' : 'Unequip' },

  get equipWord() { return this.isSoftware ? 'Install' : 'Equip' },
  get unequipWord() { return this.isSoftware ? 'Uninstall' : 'Unequip' },

  get equippedWord() { return this.isSoftware ? 'installed' : 'equipped' },
  get unequippedWord() { return this.isSoftware ? 'uninstalled' : 'unequipped' },

  canEquip(showMessage) {
    if (!this.isEquippable) {
      if (showMessage) {
        log(`${this.name} cannot be ${this.equippedWord}`)
      }
      return false
    }
    if (this.isEquipped) {
      if (showMessage) {
        log(`${this.name} is already ${this.equippedWord}`)
      }
      return false
    }
    if (!store.player.has(this)) {
      if (showMessage) {
        log(`${this.name} needs to be in your inventory first`)
      }
      return false
    }
    if (store.player.hasEquippedOfType(this.equipType)) {
      if (showMessage) {
        log(`You have already have a ${this.equipType} ${this.equippedWord}`)
      }
      return false
    }
    // for files and softwares
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is locked while an operation is running on it`)
      }
      return false
    }
    return true
  },

  async equip() {
    if (!this.canEquip(true)) {
      return false
    }
    this.equipped = true
    log(`You have equipped ${this.name.toLowerCase()}`)
    await emit.call(this, 'onEquip')
    return true
  },

  async onEquip() {},

  canUnequip(showMessage) {
    if (!this.isEquippable) {
      if (showMessage) {
        log(`${this.name} cannot be ${this.unequippedWord}`)
      }
      return false
    }
    if (!this.isEquipped) {
      if (showMessage) {
        log(`${this.name} is not ${this.equippedWord}`)
      }
      return false
    }
    // for files and softwares
    if (this.isBusy) {
      if (showMessage) {
        log(`${this.name} is locked while an operation is running on it`)
      }
      return false
    }
    return true
  },

  async unequip() {
    if (!this.canUnequip(true)) {
      return false
    }
    this.equipped = false
    log(`You have unequipped ${this.name.toLowerCase()}`)
    await emit.call(this, 'onEquip')
    return true
  },

  async onUnequip() {},
}
