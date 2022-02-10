import { log } from '@/utils'

export default {
  state: {
    equippable: false,
    equipped: false,
    equipType: undefined,
    actions: [
      item => (
        item.canEquip()
          ? {
            label: item.equipWord,
            key: item.equipKey,
            icon: item.equipIcon,
            disabled: false,
            click: item.equipClick,
          }
          : undefined
      ),
      item => (
        item.canUnequip()
          ? {
            label: item.unequipWord,
            key: item.unequipKey,
            icon: item.unequipIcon,
            disabled: false,
            click: item.unequipClick,
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

  get equipKey() { return this.isSoftware ? 'install' : 'equip' },
  get unequipKey() { return this.isSoftware ? 'uninstall' : 'unequip' },

  get equippedWord() { return this.isSoftware ? 'installed' : 'equipped' },
  get unequippedWord() { return this.isSoftware ? 'uninstalled' : 'unequipped' },

  get equipClick() {
    return this.isSoftware ? async () => this.install() : async () => this.equip()
  },

  get unequipClick() {
    return this.isSoftware ? async () => this.uninstall() : async () => this.unequip()
  },

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

  async equip() {
    if (!this.canEquip(true)) {
      return false
    }
    this.equipped = true
    log(`You have ${this.equippedWord} ${this.name}`)
    return true
  },

  async unequip() {
    if (!this.canUnequip(true)) {
      return false
    }
    this.equipped = false
    log(`You have ${this.unequippedWord} the ${this.name}`)
    return true
  },
}
