/**
 * Makes an object equipable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameSetupData } from './name'
import { IIcon, IIconSetupData } from './icon'
import { IRequirements, IRequirementsSetupData } from './requirements'
import { IOperation, IOperationSetupData } from './operation'
import { IActions, IActionsSetupData, IDropdownItem } from '@/mixins/actions'

export type Slots = 'H' | 'Y' | 'T' | 'W' | 'D' | 'L' | 'FEET'

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

export interface IEquipableSetupData extends
  INameSetupData,
  IIconSetupData,
  IRequirementsSetupData,
  IOperationSetupData,
  IActionsSetupData
{
  // is the item equipable
  equipable?: boolean
  // time it takes to equip the item
  equipDelay?: number
  // slot to equip in
  equipSlot?: Slots | null
  // is the item equipped
  equipped?: boolean
  onEquip?: () => Promise<void>
  onUnequip?: () => Promise<void>
}

export interface IEquipable extends
  IName,
  IIcon,
  IRequirements,
  IActions,
  IOperation
{
  state: State
  get isEquipable(): boolean
  set equipable(value: boolean)
  get isEquipped(): boolean
  set equipped(value: boolean)
  get equipSlot(): Slots
  set equipSlot(value)
  get equipDelay(): number
  set equipDelay(value)
  get equipLabel(): string
  get equipKey(): string
  get equipIcon(): string
  get equipDisabled(): boolean
  get equipClick(): () => Promise<boolean>
  canEquip(showMessage?: boolean): boolean
  equip(): Promise<boolean>
  onEquip(): Promise<void>
  canUnequip(showMessage?: boolean): boolean
  unequip(): Promise<boolean>
  onUnequip(): Promise<void>
}

// @ts-ignore
export const Equipable: IEquipable = {
  state: {
    equipable: false,
    equipDelay: 1000,
    equipSlot: EquipableSlots.HEAD,
    equipped: false,
    actions: [
      (item: IEquipable): IDropdownItem | undefined => (
        item.isEquipable && window.store.player.has(item)
          ? {
            label: item.equipLabel,
            key: item.equipKey,
            icon: item.equipIcon,
            disabled: item.equipDisabled,
            click: () => item.equipClick(),
          }
          : undefined
      ),
    ],
    requirements: [],
  } as IEquipableSetupData,

  get isEquipable(): boolean { return this.state.equipable },
  set equipable(value: boolean) { this.state.equipable = value },

  get isEquipped(): boolean { return this.state.equipped },
  set equipped(value: boolean) { this.state.equipped = value },

  get equipSlot(): Slots { return this.state.equipSlot },
  set equipSlot(value) { this.state.equipSlot = value },

  get equipDelay(): number { return this.state.equipDelay },
  set equipDelay(value) { this.state.equipDelay = value },

  get equipLabel(): string {
    return !this.isEquipped
      ? `Equip ${this.requirementsLabelFor('equip')}`
      : `Unequip ${this.requirementsLabelFor('unequip')}`
  },

  get equipKey(): string { return this.isEquipped ? 'unequip' : 'equip' },

  get equipIcon(): string { return this.isEquipped ? 'unequip' : 'equip' },

  get equipDisabled(): boolean { return this.isEquipped ? !this.canUnequip() : !this.canEquip() },

  get equipClick() {
    if (this.isEquipped) {
      return async () => this.unequip()
    }
    return async () => this.equip()
  },

  canEquip(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isEquipable,
        log: () => `${this.nameProper} cannot be equipped`
      },
      {
        expr: () => this.isEquipped,
        log: () => `${this.nameProper} is already equipped`
      },
      {
        expr: () => !window.store.player.has(this),
        log: () => `${this.nameProper} needs to be in your inventory first`
      },
      {
        expr: () => !!window.store.player.equippedInSlot(this.equipSlot),
        log: () => `You are already wearing ${window.store.player.equippedInSlot(this.equipSlot)?.nameDisplay}`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => `You cannot equipped ${this.nameDisplay} while in combat`
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => `You cannot equip ${this.nameDisplay} while in conversation`
      },
    ], showMessage, 'equip')
  },

  async equip(): Promise<boolean> {
    if (!this.canEquip(true)) {
      return false
    }
    // log(`Equipping ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('equip', async () => {
      this.equipped = true
      log(`You have equipped ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onEquip')
      return true
    }, this.equipDelay)
    return true
  },

  async onEquip(): Promise<void> {},

  canUnequip(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isEquipable,
        log: () => `${this.nameProper} cannot be un-equipped`
      },
      {
        expr: () => !this.isEquipped,
        log: () => `${this.nameProper} is not equipped`
      },
      {
        expr: () => window.store.player.isInCombat,
        log: () => `You cannot un-equip ${this.nameDisplay} while in combat`
      },
      {
        expr: () => window.store.player.isInDialog,
        log: () => `You cannot un-equip ${this.nameDisplay} while in conversation`
      },
    ], showMessage, 'unequip')
  },

  async unequip(): Promise<boolean> {
    if (!this.canUnequip(true)) {
      return false
    }
    // log(`Un-equipping ${this.nameDisplay}...`, LOG_WARN, this.icon)
    await this.operate('equip', async () => {
      this.equipped = false
      log(`You have un-equipped ${this.nameDisplay}`, LOG_WARN, this.icon)
      await emit(this, 'onUnequip')
      return true
    }, this.equipDelay)
    return true
  },

  async onUnequip(): Promise<void> {},
}
