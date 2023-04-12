/**
 * Make the object droppable
 */

import { can, emit, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IName, INameSetupData } from './name'
import { IIcon, IIconSetupData } from './icon'
import { ILocation, ILocationSetupData } from './location'
import { IInstallable } from './installable'
import { IEquipable } from './equipable'
import { IHovered, IHoveredSetupData } from './hovered'
import { IRequirements, IRequirementsSetupData } from './requirements'
import { IActions, IActionsSetupData, IDropdownItem } from '@/mixins/actions'

export interface IDropableSetupData extends
  INameSetupData,
  IIconSetupData,
  IHoveredSetupData,
  ILocationSetupData,
  IRequirementsSetupData,
  IActionsSetupData
{
  // is the object droppable or not
  dropable?: boolean
  onDrop?: () => Promise<void>
}

export interface IDropable extends
  IName,
  IIcon,
  IEquipable,
  IInstallable,
  IHovered,
  ILocation,
  IRequirements,
  IActions
{
  state: State
  get isDropable(): boolean
  set dropable(value: boolean)
  get dropLabel(): string
  canDrop(showMessage?: boolean): boolean
  drop(): Promise<boolean>
  onDrop(): Promise<void>
}

// @ts-ignore
export const Dropable: IDropable = {
  state: {
    dropable: true,
    actions: [
      (item: IDropable): IDropdownItem | undefined => (
        item.isDropable && window.store.player.has(item)
          ? {
            label: item.dropLabel,
            key: 'drop',
            icon: 'drop',
            disabled: !item.canDrop(),
            click: () => item.drop(),
          }
          : undefined
      ),
    ],
  } as IDropableSetupData,

  get isDropable(): boolean { return this.state.dropable },
  set dropable(value: boolean) { this.state.dropable = value },

  get dropLabel(): string { return `Drop ${this.requirementsLabelFor('drop')}` },

  canDrop(showMessage?: boolean): boolean {
    return can(this, [
      {
        expr: () => !this.isDropable,
        log: () => `${this.nameProper} cannot be dropped`
      },
      {
        expr: () => !window.store.player.has(this),
        log: () => `${this.nameProper} needs to be in your inventory first`
      },
      {
        expr: () => this.isEquipped,
        log: () => `${this.nameProper} cannot be dropped while it is equipped`
      },
      {
        expr: () => (this as any).isSoftware && this.isInstalled,
        log: () => `${this.nameProper} needs to be uninstalled first`
      },
      {
        expr: () => this.isInstalled,
        log: () => `${this.nameProper} needs to be uninstalled first`
      },
    ], showMessage, 'drop')
  },

  async drop(): Promise<boolean> {
    if (!this.canDrop(true)) {
      return false
    }
    // place back in the current room
    this.location = window.store.game.room
    // the object is now new to its new location
    this.hovered = false
    log(`You drop ${this.nameDisplay}`, LOG_WARN, this.icon)
    await emit(this, 'onDrop')
    return true
  },

  async onDrop(): Promise<void> {
    window.store.game.playSound('drop')
  },
}
