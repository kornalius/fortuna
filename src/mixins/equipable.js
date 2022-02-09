import { log } from '@/utils'

export default {
  state: {
    equippable: false,
    equipped: false,
    equipType: undefined,
    actions: [
      item => (
        item.isEquippable && !item.isEquipped
          ? {
            label: item.equipWord,
            key: 'equip',
            icon: item.equipIcon,
            disabled: false,
            click: () => item.equip(),
          }
          : undefined
      ),
      item => (
        item.isEquippable && item.isEquipped
          ? {
            label: item.unequipWord,
            key: 'unequip',
            icon: item.unequipIcon,
            disabled: false,
            click: () => item.unequip(),
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

  get canEquip() {
    return this.isEquippable
  },

  get canUnequip() {
    return true
  },

  get equipIcon() { return this.isSoftware ? 'whh:savetodrive' : 'bx:bxs-t-shirt' },
  get unequipIcon() { return this.isSoftware ? 'entypo:uninstall' : 'Unequip' },

  get equipWord() { return this.isSoftware ? 'Install' : 'Equip' },
  get unequipWord() { return this.isSoftware ? 'Uninstall' : 'Unequip' },

  get equippedWord() { return this.isSoftware ? 'installed' : 'equipped' },
  get unequippedWord() { return this.isSoftware ? 'uninstalled' : 'unequipped' },

  equip(target) {
    if (!this.canEquip || !target.canEquip(this)) {
      return false
    }
    if (!this.isEquipped) {
      this.equipped = true
      if (!this.isFile && !this.isSoftware) {
        log(`You have ${this.equippedWord} the ${this.name}`)
      }
      return true
    }
    if (!this.isFile && !this.isSoftware) {
      log(`${this.name} is already ${this.equippedWord}`)
    }
    return false
  },

  unequip(target) {
    if (!this.canUnequip || !target.canUnequip(this)) {
      return false
    }
    if (this.isEquipped) {
      this.equipped = false
      if (!this.isFile && !this.isSoftware) {
        log(`You have ${this.unequippedWord} the ${this.name}`)
      }
      return true
    }
    if (!this.isFile && !this.isSoftware) {
      log(`${this.name} is already ${this.unequippedWord}`)
    }
    return false
  },
}
