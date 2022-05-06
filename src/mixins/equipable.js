import { can, emit, log, LOG_WARN } from '@/utils'
import { store } from '@/store'

/**
 * Makes an object equipable
 */

export const EquipableSlots = {
  HEAD: 'H',
  EYES: 'Y',
  TORSO: 'T',
  WAIST: 'W',
  HANDS: 'D',
  LEGS: 'L',
  FEET: 'FEET',
}

export const EquipableIcons = {
  [EquipableSlots.HEAD]: 'char-head',
  [EquipableSlots.EYES]: 'char-eyes',
  [EquipableSlots.TORSO]: 'char-torso',
  [EquipableSlots.WAIST]: 'char-waist',
  [EquipableSlots.HANDS]: 'char-hands',
  [EquipableSlots.LEGS]: 'char-legs',
  [EquipableSlots.FEET]: 'char-feet',
}

export default {
  state: {
    // is the item equipable
    equipable: false,
    // time it takes to equip the item
    equipDelay: 1000,
    // slot to equip in
    equipSlot: EquipableSlots.HEAD,
    // is the item equipped
    equipped: false,
    actions: [
      item => (
        item.isEquipable && store.player.has(item)
          ? {
            label: item.equipLabel,
            key: item.equipKey,
            icon: item.equipIcon,
            disabled: item.equipDisabled,
            click: item.equipClick,
          }
          : undefined
      ),
    ],
    requirements: [],
  },

  get isEquipable() { return this.state.equipable },
  set equipable(value) { this.state.equipable = value },

  get isEquipped() { return this.state.equipped },
  set equipped(value) { this.state.equipped = value },

  get equipSlot() { return this.state.equipSlot },
  set equipSlot(value) { this.state.equipSlot = value },

  get equipDelay() { return this.state.equipDelay },
  set equipDelay(value) { this.state.equipDelay = value },

  get equipLabel() {
    return !this.isEquipped
      ? `Equip ${this.requirementsLabelFor('equip')}`
      : `Unequip ${this.requirementsLabelFor('unequip')}`
  },

  get equipKey() {
    return this.isEquipped ? 'unequip' : 'equip'
  },

  get equipIcon() {
    return this.isEquipped ? 'unequip' : 'equip'
  },

  get equipDisabled() {
    return this.isEquipped ? !this.canUnequip() : !this.canEquip()
  },

  get equipClick() {
    if (this.isEquipped) {
      return async () => this.unequip()
    }
    return async () => this.equip()
  },

  canEquip(showMessage) {
    return can(this, [
      {
        expr: () => !this.isEquipable,
        log: () => `${this.name} cannot be equipped`
      },
      {
        expr: () => this.isEquipped,
        log: () => `${this.name} is already equipped`
      },
      {
        expr: () => !store.player.has(this),
        log: () => `${this.name} needs to be in your inventory first`
      },
      {
        expr: () => store.player.equippedInSlot(this.equipSlot),
        log: () => `You are already wearing ${store.player.equippedInSlot(this.equipSlot).toLowerCase()}`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => `You cannot equipped ${this.name.toLowerCase()} while in combat`
      },
      {
        expr: () => store.player.isInDialog,
        log: () => `You cannot equip ${this.name.toLowerCase()} while in conversation`
      },
    ], showMessage, 'equip')
  },

  async equip() {
    if (!this.canEquip(true)) {
      return false
    }
    // log(`Equipping ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    await this.operate('equip', async () => {
      this.equipped = true
      log(`You have equipped ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit.call(this, 'onEquip')
    }, this.equipDelay)
    return true
  },

  async onEquip() {},

  canUnequip(showMessage) {
    return can(this, [
      {
        expr: () => !this.isEquipable,
        log: () => `${this.name} cannot be un-equipped`
      },
      {
        expr: () => !this.isEquipped,
        log: () => `${this.name} is not equipped`
      },
      {
        expr: () => store.player.isInCombat,
        log: () => `You cannot un-equip ${this.name.toLowerCase()} while in combat`
      },
      {
        expr: () => store.player.isInDialog,
        log: () => `You cannot un-equip ${this.name.toLowerCase()} while in conversation`
      },
    ], showMessage, 'unequip')
  },

  async unequip() {
    if (!this.canUnequip(true)) {
      return false
    }
    // log(`Un-equipping ${this.name.toLowerCase()}...`, LOG_WARN, this.icon)
    await this.operate('equip', async () => {
      this.equipped = false
      log(`You have un-equipped ${this.name.toLowerCase()}`, LOG_WARN, this.icon)
      await emit.call(this, 'onUnequip')
    }, this.equipDelay)
    return true
  },

  async onUnequip() {},
}
